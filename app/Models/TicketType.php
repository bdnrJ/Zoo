<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'age_info',
        'price',
        'is_active',
        'type'
    ];

    public function Items()
    {
        return $this->hasMany(Item::class);
    }
}
