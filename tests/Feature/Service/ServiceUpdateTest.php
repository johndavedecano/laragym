<?php

namespace Tests\Feature\Service;

use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class ServiceUpdateTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->put('/api/services/1', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $model = Service::factory()->create();

        $bearer = $this->getUserAuth();

        $response = $this->put('/api/services/' . $model->id, [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_validation_error()
    {
        $model = Service::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/services/' . $model->id, [
            'num_days' => 'string',
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(422);
    }

    public function test_resource_not_found()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/services/3', [
            'num_days' => 'string',
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(404);
    }

    public function test_store_success()
    {
        $model = Service::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/services/' . $model->id, [
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
