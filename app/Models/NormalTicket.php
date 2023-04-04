<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NormalTicket extends Model
{
    use HasFactory;


    protected $fillable = [
        'ticket_type',
        'transaction_id',
    ];

    public $timestamps = false;

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
