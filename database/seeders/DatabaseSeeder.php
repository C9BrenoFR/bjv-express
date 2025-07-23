<?php

namespace Database\Seeders;

use App\Models\Delivery;
use App\Models\Unit;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Hash;
use Illuminate\Database\Seeder;
use Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Unit::factory()->count(10)->create();

        User::create([
            'name' => "Admin",
            'email' => "admin@gmail.com",
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'role' => '0',
            'unit_id' => 1
        ]);
        User::factory()->count(50)->create();
        Delivery::factory()->count(100)->create();
    }
}
