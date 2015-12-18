<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\LoanHistory;
use Validator;
use Carbon\Carbon;

class LoanController extends BaseController
{

    /**
     * Display home page
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $loans = Loan::get();
        $loans->each(function ($loan) {
            $lastLoan = $loan->historyRecords()->get()->last();
            $loan->end_date = $lastLoan->end_date;
            $loan->status = $lastLoan->status;
            $loan->history_record_id = $lastLoan->id;
        });

        return view('index', [
            'loans' => $loans->toJson()
        ]);
    }

    /**
     * Check status of history record
     *
     * @param int $hrId id of history record
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getHistoryStatus($hrId)
    {
        $historyRecord = LoanHistory::findOrFail($hrId);
        $createdAtTime = strtotime($historyRecord->created_at);
        $currentTime = time();

        // time to show the user some status
        if ($currentTime - $createdAtTime > 100 && $historyRecord->status === 'Waiting') {
            $historyRecord->status = (rand(0, 100)) > 30 ? "Approved" : "Rejected"; //70% of approved and 30% of rejected
            $historyRecord->save();
        }

        return response()->json(['status' => $historyRecord->status]);
    }

    /**
     * Extend current loan
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function extend(Request $request)
    {
        $loan = Loan::findOrFail($request->get('loan_id'));

        $historyRecord = $loan->historyRecords()->create([
            'end_date' => $request->get('end_date'),
            'status' => 'Waiting',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        return response()->json([
            'id' => $historyRecord->id
        ]);
    }

    /**
     * Store loan information to database
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function store(Request $request)
    {
        // Validation rules
        $validator = Validator::make($request->all(), [
            'amount' => 'required',
            'end_date' => 'required',
            'name' => 'required',
            'iban' => 'required',
            'phone' => 'required',
        ]);

        // If validation fails, provide errors
        if ($validator->fails()) {
            return response()->json([
                'success' => 0,
                'messages' => $validator->errors()->all()
            ]);
        }

        // Risk assessment
        // 1. 3 loans from single ip per 24 hours
        // 2. Max amout between 00:00 and 06:00
        $loans = Loan::where('ip', '=', $request->ip())
            ->where('start_date', '>=', Carbon::now()->subDay())->get();

        if ($loans) { // If there are any loans at all.
            $currentTime = new \DateTime('now');
            $start = new \DateTime('today midnight');
            $end = new \DateTime('today midnight + 6 hours');
            $loanLimitPerDay = ($loans->count() >= 3);
            $amountOnTime = ((int)$request->get('amount') === 500 && $currentTime > $start && $currentTime < $end);

            if ($loanLimitPerDay || $amountOnTime) {
                return response()->json([
                    'error' => $loanLimitPerDay . '||' . $amountOnTime
                ]);
            }
        }

        // Loan record
        $loan = Loan::create([
            'amount' => $request->get('amount'),
            'start_date' => date('Y-m-d H:i:s'),
            'name' => $request->get('name'),
            'phone' => $request->get('phone'),
            'iban' => $request->get('iban'),
            'ip' => $request->ip()
        ]);

        // Loan history record
        $loanHistory = $loan->historyRecords()->create([
            'end_date' => $request->get('end_date'),
            'status' => 'Waiting', // initial status
            'created_at' => date('Y-m-d H:i:s')
        ]);

        return response()->json([
            'id' => $loan->id,
            'history_record_id' => $loanHistory->id
        ]);
    }

    /**
     * View loan information and extensions for a certain loan.
     *
     * @param  int $id
     *
     * @return \Illuminate\View\View
     */
    public function view($id)
    {
        $loan = Loan::with('historyRecords')->findOrFail($id);
        $loan->historyRecords->each(function ($history) use ($loan) {
            $history->start_date = $loan->start_date;
            $history->amount = $loan->amount;
            $history->history_record_id = $history->id;
        });

        return view('view', [
            'loan' => $loan->toJson()
        ]);
    }
}
