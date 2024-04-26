<?php

namespace Tests\Feature\Activity;

use App\Constants;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class ActivityStoreTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->post('/api/activities', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $bearer = $this->getUserAuth();

        $response = $this->post('/api/activities', [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_validation_error()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->post('/api/activities', [], [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(422);
    }

    public function test_store_success()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->post('/api/activities', [
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
