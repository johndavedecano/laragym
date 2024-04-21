<?php

namespace Tests\Feature\Cycle;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CycleIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthorized()
    {
        $response = $this->get('/api/cycles', [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_not_admin()
    {
        $user = User::factory()->create();

        $token = $user->getPersonalAccessToken();

        $response = $this->get('/api/cycles', [
            'Accept' => 'application/json',
            'Authorization' => "Bearer $token"
        ]);

        $response->assertStatus(403);
    }

    public function test_fetch_success()
    {
        $user = User::factory()->create();
        $user->is_admin = true;
        $user->save();

        $token = $user->getPersonalAccessToken();

        $response = $this->get('/api/cycles', [
            'Accept' => 'application/json',
            'Authorization' => "Bearer $token"
        ]);

        $response->assertStatus(200);
    }
}
