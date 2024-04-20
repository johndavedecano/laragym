<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RefreshTest extends TestCase
{
    use RefreshDatabase;

    public function test_refresh_failed()
    {
        $response = $this->post('/api/auth/refresh', [], [
            'Accept' => 'application/json',
            'Authorization' => "Bearer"
        ]);

        $response->assertStatus(401);
    }

    public function test_refresh_success()
    {
        $user = User::factory()->create();

        $token = $user->getPersonalAccessToken();

        $response = $this->post('/api/auth/refresh', [], [
            'Accept' => 'application/json',
            'Authorization' => "Bearer $token"
        ]);

        $response->assertStatus(200);
    }
}
