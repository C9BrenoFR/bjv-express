<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'id',
        'country',
        'state',
        'city',
        'neighborhood',
        'street',
        'number',
        'complement',
    ];
}
