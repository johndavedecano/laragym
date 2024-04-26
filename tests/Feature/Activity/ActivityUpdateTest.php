<?php

namespace Tests\Feature\Activity;

use App\Constants;
use App\Models\Activity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class ActivityUpdateTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->put('/api/activities/1', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $model = Activity::factory()->create();

        $bearer = $this->getUserAuth();

        $response = $this->put('/api/activities/' . $model->id, [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_validation_error()
    {
        $model = Activity::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/activities/' . $model->id, [
            'entity_id' => null,
            'type' => Constants::ACTIVITY_ATTENDANCE,
            'description' => fake()->paragraph(1),
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(422);
    }

    public function test_resource_not_found()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/activities/3', [
            'entity_id' => 1,
            'type' => Constants::ACTIVITY_ATTENDANCE,
            'description' => fake()->paragraph(1),
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(404);
    }

    public function test_store_success()
    {
        $model = Activity::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->put('/api/activities/' . $model->id, [
            'entity_id' => 1,
            'type' => Constants::ACTIVITY_ATTENDANCE,
            'description' => fake()->paragraph(1),
        ], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
