<?php

namespace Tests\Feature\Subscription;

use App\Models\Cycle;
use App\Models\Package;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class SubscriptionStoreTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->post('/api/subscriptions', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $bearer = $this->getUserAuth();

        $response = $this->post('/api/subscriptions', [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_validation_error()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->post('/api/subscriptions', [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(422);
    }

    public function test_store_success()
    {
        $bearer = $this->getAdminAuth();

        $package = Package::factory()->create();
        $user = User::factory()->create();

        $response = $this->post('/api/subscriptions', [
            'package_id' => $package->id,
            'user_id' => $user->id,
            'interval' => 1,
            'status' => 'active'
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
