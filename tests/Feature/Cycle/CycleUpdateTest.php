<?php

namespace Tests\Feature\Cycle;

use App\Models\Cycle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class CycleUpdateTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->put('/api/cycles/1', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $model = Cycle::factory()->create();

        $bearer = $this->getUserAuth();

        $response = $this->put('/api/cycles/' . $model->id, [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_validation_error()
    {
        $model = Cycle::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/cycles/' . $model->id, [
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

        $response = $this->put('/api/cycles/3', [
            'num_days' => 'string',
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(404);
    }

    public function test_store_success()
    {
        $model = Cycle::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/cycles/' . $model->id, [
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
