<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;

    protected $fillable = [
        'step',
        'mode',
        'delivery_id',
    ];

    public function delivery()
    {
        return $this->belongsTo(Delivery::class);
    }
}
