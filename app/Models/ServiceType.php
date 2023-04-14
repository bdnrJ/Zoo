<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'price_per_customer',
        'is_active'
    ];

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
