<?php

namespace Tests\Feature\Service;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class ServiceIndexTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_unauthorized()
    {
        $response = $this->get('/api/services', [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_not_admin()
    {
        $bearer = $this->getUserAuth();

        $response = $this->get('/api/services', [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_fetch_success()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->get('/api/services', [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
