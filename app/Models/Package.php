<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = [
        'id',
        'width',
        'height',
        'depth',
        'weight',
        'address_id',
    ];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function deliver()
    {
        return $this->hasOne(Delivery::class);
    }
}
