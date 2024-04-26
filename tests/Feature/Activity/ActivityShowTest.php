<?php

namespace Tests\Feature\Activity;

use App\Models\Activity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class ActivityShowTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->get('/api/activities/1', [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $model = Activity::factory()->create();

        $bearer = $this->getUserAuth();

        $response = $this->get('/api/activities/' . $model->id, [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_resource_not_found()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->get('/api/activities/3', [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(404);
    }

    public function test_show_success()
    {
        $model = Activity::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->get('/api/activities/' . $model->id, [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
