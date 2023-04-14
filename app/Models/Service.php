<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'service_type_id'
    ];

    public $timestamps = false;

    public function serviceType()
    {
        return $this->belongsTo(ServiceType::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
