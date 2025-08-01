<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;
    protected $fillable = [
        "id",
        "title",
        "address_id"
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }
}
