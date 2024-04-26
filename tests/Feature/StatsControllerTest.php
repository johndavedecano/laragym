<?php

namespace Tests\Feature\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\UserSessionTrait;

class StatsControllerTest extends TestCase
{
    use RefreshDatabase, UserSessionTrait;

    public function test_stats_subscriptions()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->get('/api/stats/subscriptions', [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }

    public function test_stats_services()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->get('/api/stats/services', [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }

    public function test_stats_members()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->get('/api/stats/members', [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }

    public function test_stats_packages()
    {
        $bearer = $this->getAdminAuth();

        $response = $this->get('/api/stats/packages', [
            'Accept' => 'application/json',
            'Authorization' => $bearer
        ]);

        $response->assertStatus(200);
    }
}
