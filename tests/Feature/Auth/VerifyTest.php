<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class VerifyTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_invalid_verification_hash()
    {
        $response = $this->post('/api/auth/verify/1/test', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(400);
    }

    public function test_account_does_not_exist()
    {
        $verificationUrl = url()->temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => 1000, 'hash' => sha1("test@test.com")]
        );

        $response = $this->post($verificationUrl, [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(404);
    }

    public function test_verify_success()
    {
        $user = User::factory()->create();

        $verificationUrl = url()->temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $response = $this->post($verificationUrl, [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(200)->assertJson(function (AssertableJson $json) {
            $json->hasAny(['success', 'message']);
        });
    }
}
