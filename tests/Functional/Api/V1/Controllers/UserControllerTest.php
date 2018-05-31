<?php

namespace App\Functional\Api\V1\Controllers;

use Hash;
use App\Models\User;
use App\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Functional\Api\V1\Controllers\UserLoginTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserControllerTest extends TestCase
{
    use DatabaseMigrations;
    use RefreshDatabase;

    use UserLoginTrait;

    public function setUp()
    {
        parent::setUp();

        $this->login('admin@admin.com', 'password');
    }

    public function testMeFailed()
    {
        $response = $this->get('api/me');

        $response->assertStatus(401);
    }

    public function testMe()
    {
        $headers = [
            'Authorization' => 'Bearer ' . $this->token
        ];

        $this->get('api/me', $headers, $headers)->isOk();
    }
}
