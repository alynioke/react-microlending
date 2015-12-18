<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoanHistory extends Model {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'history_records';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['status', 'end_date', 'created_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['loan_id'];

    /**
     * Disable eloquent default timestamp update
     * @var boolean
     */
    public $timestamps = false;

    public function getEndDateAttribute($value)
    {
        return date("Y-m-d", strtotime($value));
    }

    public function setEndDatettribute($value)
    {
        $this->attributes['end_date'] = date("Y-m-d", strtotime($value));
    }
}
