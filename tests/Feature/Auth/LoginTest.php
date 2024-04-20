<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_validation_error()
    {
        $response = $this->post('/api/auth/login', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(422);
    }

    public function test_account_does_not_exist()
    {
        $response = $this->post('/api/auth/login', [
            'email' => 'test@test.com',
            'password' => 'password',
        ], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(422);
    }

    public function test_invalid_login_credentials()
    {
        $user = User::factory()->create();

        $response = $this->post('/api/auth/login', [
            'email' => $user->email,
            'password' => 'wrongpassword',
        ], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }


    public function test_login_success()
    {
        $user = User::factory()->create();

        $response = $this->post('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(200);
    }
}
