<?php

namespace Tests\Feature;

use App\Models\Unit;
use App\Models\User;
use Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        Unit::factory()->count(10)->create();
        
        $this->actingAs($user = User::create([
            'name' => "Admin",
            'email' => "admin@gmail.com",
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'role' => '0',
            'unit_id' => 1
        ]));

        $this->get('/dashboard')->assertOk();
    }
}
