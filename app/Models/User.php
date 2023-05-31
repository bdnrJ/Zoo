<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class User extends Authenticatable

{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    protected static function boot()
    {
        parent::boot();

        // Remove the global scope that excludes soft deleted records
        static::addGlobalScope('withTrashed', function (Builder $builder) {
            $builder->withTrashed();
        });
    }

    public function getDiscountPercent() {
        $totalDonation = $this->donations->sum('amount');
        if ($totalDonation >= 5000 && $totalDonation < 10000) {
            return 5;
        } else if ($totalDonation >= 10000 && $totalDonation < 20000) {
            return 10;
        } else if ($totalDonation >= 20000) {
            return 20;
        } else {
            return 0;
        }
    }

}
