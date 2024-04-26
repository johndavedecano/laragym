<?php

namespace Tests\Feature\Branch;

use App\Models\Branch;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class BranchUpdateTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->put('/api/branches/1', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $model = Branch::factory()->create();

        $bearer = $this->getUserAuth();

        $response = $this->put('/api/branches/' . $model->id, [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_validation_error()
    {
        $model = Branch::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/branches/' . $model->id, [
            'name' => '',
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(422);
    }

    public function test_resource_not_found()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/branches/0', [
            'name' => 'test',
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(404);
    }

    public function test_store_success()
    {
        $model = Branch::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/branches/' . $model->id, [
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
