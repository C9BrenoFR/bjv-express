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

    static const TOTAL = 0;
    static const UPPER_TO_CITY = 1;
    static const STREET_MAIN_INFORMATION = 2;
    public function print(int $config): string
    {
        if ($config == 0) {
            return $this->street . ' ,' . $this->number . ' ' . $this->complement . ' ,'
                . $this->neighborhood . ' ,' . $this->city . ' ,' . $this->state . ' ,' . $this->country;
        } else if ($config == 1) {
            return $this->city . ' ,' . $this->state . ' ,' . $this->county;
        } else if ($config == 2) {
            return $this->street . ' ,' . $this->number . ' ,' . $this->complement . ' ,' . $this->neighborhood;
        }
        return $this->city;
    }
}
