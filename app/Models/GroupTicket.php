<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'people',
        'educational_materials',
        'guided_tour',
        'food_included',
    ];

    public $timestamps = false;

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
