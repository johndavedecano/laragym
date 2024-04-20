<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class ResendTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_validation_error()
    {
        $response = $this->post('/api/auth/resend', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(422);
    }

    public function test_account_does_not_exist()
    {
        $response = $this->post('/api/auth/resend', ['email' => 'noexist@email.com'], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(404);
    }

    public function test_user_already_verified()
    {
        $user = User::factory()->create();

        $user->markEmailAsVerified();

        $response = $this->post('/api/auth/resend', ['email' => $user->email], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(400);
    }

    public function test_user_resend_success()
    {
        $user = User::factory()->unverified()->create();

        $response = $this->post('/api/auth/resend', ['email' => $user->email], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(200);
    }
}
