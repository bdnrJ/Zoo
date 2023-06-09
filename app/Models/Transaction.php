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

    public function Items()
    {
        return $this->hasMany(Item::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
