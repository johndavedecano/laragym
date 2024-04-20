<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;
use Illuminate\Auth\Passwords\PasswordBroker;

class ResetTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_validation_error()
    {
        $response = $this->post('/api/auth/reset', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(422);
    }

    public function test_reset_bad_token()
    {
        $response = $this->post('/api/auth/reset', [
            'email' => 'test@test.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'token' => 'test'
        ], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(400);
    }

    public function test_reset_success()
    {
        $user = User::factory()->create();

        $token = app()->get(PasswordBroker::class)->createToken($user);

        $response = $this->post('/api/auth/reset', [
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password',
            'token' => $token
        ], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(200)->assertJson(function (AssertableJson $json) {
            $json->hasAny(['success', 'message']);
        });
    }
}
