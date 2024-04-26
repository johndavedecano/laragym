<?php

namespace Tests\Feature\Package;

use App\Models\Cycle;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class PackageStoreTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->post('/api/packages', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $bearer = $this->getUserAuth();

        $response = $this->post('/api/packages', [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_validation_error()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->post('/api/packages', [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(422);
    }

    public function test_store_success()
    {
        $bearer = $this->getAdminAuth();

        $service = Service::factory()->create();
        $cycle = Cycle::factory()->create();

        $response = $this->post('/api/packages', [
            'service_id' => $service->id,
            'cycle_id' => $cycle->id,
            'name' => fake()->name(),
            'num_days' => fake()->numberBetween(1, 10),
            'status' => 'active',
            'amount' => fake()->numberBetween(1, 100)
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
