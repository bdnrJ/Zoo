<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'buy_date',
        'exp_date',
        'user_id',
        'total_cost',
        'type',
    ];

    public $timestamps = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function NormalTickets()
    {
        return $this->hasMany(NormalTicket::class);
    }

    public function GroupTickets()
    {
        return $this->hasMany(GroupTicket::class);
    }
}
