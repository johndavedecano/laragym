<?php

namespace Tests\Feature\Subscription;

use App\Models\Package;
use App\Models\Subscription;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class SubscriptionDestroyTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->delete('/api/subscriptions/1', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $model = Subscription::factory()->create();

        $bearer = $this->getUserAuth();

        $response = $this->delete('/api/subscriptions/' . $model->id, [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_resource_not_found()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->delete('/api/subscriptions/3', [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(404);
    }

    public function test_destroy_success()
    {
        $model = Subscription::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->delete('/api/subscriptions/' . $model->id, [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(204);
    }
}
