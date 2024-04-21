<?php

namespace Tests\Feature\Cycle;

use App\Models\Cycle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class CycleShowTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_user_is_unauthorized()
    {
        $response = $this->get('/api/cycles/1', [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(401);
    }

    public function test_user_is_not_admin()
    {
        $model = Cycle::factory()->create();

        $bearer = $this->getUserAuth();

        $response = $this->get('/api/cycles/' . $model->id, [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(403);
    }

    public function test_resource_not_found()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->get('/api/cycles/3', [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(404);
    }

    public function test_show_success()
    {
        $model = Cycle::factory()->create();

        $bearer = $this->getAdminAuth();

        $response = $this->get('/api/cycles/' . $model->id, [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
