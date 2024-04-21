<?php

namespace Tests\Feature\Cycle;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class CycleIndexTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_unauthorized()
    {
        $response = $this->get('/api/cycles', [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_not_admin()
    {
        $bearer = $this->getUserAuth();

        $response = $this->get('/api/cycles', [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_fetch_success()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->get('/api/cycles', [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
