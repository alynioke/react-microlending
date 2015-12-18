<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Loan extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'loans';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['amount', 'start_date', 'name', 'iban', 'phone', 'ip'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * Disable eloquent default timestamp update
     * @var boolean
     */
    public $timestamps = false;

    /**
     * Loan and loan history relation
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function historyRecords() {
        return $this->hasMany(LoanHistory::class);
    }

    public function getStartDateAttribute($value) {
        return date("Y-m-d", strtotime($value));
    }
}
