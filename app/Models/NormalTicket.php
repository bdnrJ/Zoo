<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NormalTicket extends Model
{
    use HasFactory;


    protected $fillable = [
        'ticket_type_id',
        'transaction_id',
        'amount',
    ];

    public $timestamps = false;

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}