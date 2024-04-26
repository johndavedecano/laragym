<?php

namespace Tests\Feature\Package;

use App\Models\Cycle;
use App\Models\Package;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class PackageUpdateTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->put('/api/packages/1', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $model = Package::factory()->create();

        $bearer = $this->getUserAuth();

        $response = $this->put('/api/packages/' . $model->id, [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_validation_error()
    {
        $model = Package::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/packages/' . $model->id, [
            'name' => ''
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(422);
    }

    public function test_resource_not_found()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/packages/3', [

        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(404);
    }

    public function test_store_success()
    {
        $model = Package::factory()->create();

        $bearer = $this->getAdminAuth();

        $service = Service::factory()->create();
        $cycle = Cycle::factory()->create();

        $response = $this->put('/api/packages/' . $model->id, [
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
