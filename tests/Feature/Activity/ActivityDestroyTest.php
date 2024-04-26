<?php

namespace Tests\Feature\Activity;

use App\Models\Activity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class ActivityDestroyTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->delete('/api/activities/1', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $model = Activity::factory()->create();

        $bearer = $this->getUserAuth();

        $response = $this->delete('/api/activities/' . $model->id, [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_resource_not_found()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->delete('/api/activities/3', [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(404);
    }

    public function test_destroy_success()
    {
        $model = Activity::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->delete('/api/activities/' . $model->id, [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(204);
    }
}
