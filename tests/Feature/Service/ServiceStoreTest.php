<?php

namespace Tests\Feature\Service;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class ServiceStoreTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->post('/api/services', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $bearer = $this->getUserAuth();

        $response = $this->post('/api/services', [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_validation_error()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->post('/api/services', [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(422);
    }

    public function test_store_success()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->post('/api/services', [
            'name' => fake()->name(),
            'num_days' => fake()->numberBetween(1, 10),
            'status' => 'active',
            'description' => fake()->paragraph(1),
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
