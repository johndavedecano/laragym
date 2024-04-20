<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class ForgotTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_validation_error()
    {
        $response = $this->post('/api/auth/forgot', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(422);
    }

    public function test_account_does_not_exist()
    {
        $response = $this->post('/api/auth/forgot', [
            'email' => 'test@test.com',
        ], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(400);
    }

    public function test_forgot_success()
    {
        $user = User::factory()->create();

        $response = $this->post('/api/auth/forgot', [
            'email' => $user->email,
        ], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(200)->assertJson(function (AssertableJson $json) {
            $json->hasAny(['success', 'message']);
        });
    }
}
