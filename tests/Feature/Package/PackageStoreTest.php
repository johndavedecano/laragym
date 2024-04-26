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
            'cycle_id' => $cycle->id,
            'services' => [$service->id],
            'amount' => 1,
            'name' => fake()->name(),
            'status' => 'active'
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
