<?php

namespace Tests\Feature\Subscription;

use App\Models\Subscription;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class SubscriptionUpdateTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->put('/api/subscriptions/1', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $model = Subscription::factory()->create();

        $bearer = $this->getUserAuth();

        $response = $this->put('/api/subscriptions/' . $model->id, [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_validation_error()
    {
        $model = Subscription::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/subscriptions/' . $model->id, [
            'status' => ''
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(422);
    }

    public function test_resource_not_found()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/subscriptions/3', [

        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(404);
    }

    public function test_store_success()
    {
        $model = Subscription::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/subscriptions/' . $model->id, [
            'status' => 'active'
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
