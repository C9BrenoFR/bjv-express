<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Delivery extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    protected $fillable = [
        'status',
        'mode',
        'value',
        'package_id',
        'last_to_update',
        'unit_id',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function lastToUpdate()
    {
        return $this->belongsTo(User::class, 'last_to_update');
    }

    public function histories()
    {
        return $this->hasMany(History::class);
    }
}
