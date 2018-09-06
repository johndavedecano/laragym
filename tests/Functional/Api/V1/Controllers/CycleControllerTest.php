<?php

namespace App\Functional\Api\V1\Controllers;

use Hash;
use App\Functional\Api\V1\Controllers\UserLoginTrait;
use App\Models\Cycle;
use App\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CycleControllerTest extends TestCase
{
    use RefreshDatabase;

    use UserLoginTrait;

    public function setUp()
    {
        parent::setUp();

        $this->login('admin@admin.com', 'password');
    }

    public function testIndexFails()
    {
        $response = $this->get('api/cycles');

        $response->assertStatus(401);
    }

    public function testIndexSuccess()
    {
        $this->get('api/cycles', $this->headers)->isOk();
    }

    public function testStoreFails()
    {
        $response = $this->withHeaders($this->headers)->json('POST', 'api/cycles', []);

        $response->assertStatus(422);
    }

    public function testStoreSuccess()
    {
        $response = $this->withHeaders($this->headers)->json('POST', 'api/cycles', ['name' => 'Dave']);

        $response->assertStatus(201);
    }

    public function testUpdateFailsValidation()
    {
        $model = Cycle::create(['name' => 'Dave']);

        $response = $this->withHeaders($this->headers)->json('PUT', 'api/cycles/'.$model->id, []);

        $response->assertStatus(422);
    }

    public function testUpdateFailsNotFound()
    {
        $response = $this->withHeaders($this->headers)->json('PUT', 'api/cycles/35729582', ['name' => 'Dave']);

        $response->assertStatus(404);
    }

    public function testUpdateSuccess()
    {
        $model = Cycle::create(['name' => 'Dave']);

        $response = $this->withHeaders($this->headers)->json('PUT', 'api/cycles/'.$model->id, ['name' => 'Dave']);

        $response->assertStatus(200);
    }

    public function testDestroyFailsDefault()
    {
        $model = Cycle::create(['name' => 'Dave', 'is_default' => true]);

        $response = $this->withHeaders($this->headers)->json('DELETE', 'api/cycles/'.$model->id);

        $response->assertStatus(400);
    }

    public function testDestroyFailsNotFound()
    {
        $response = $this->withHeaders($this->headers)->json('DELETE', 'api/cycles/35729582', ['name' => 'Dave']);

        $response->assertStatus(404);
    }

    public function testDestroySuccess()
    {
        $model = Cycle::create(['name' => 'Dave']);

        $response = $this->withHeaders($this->headers)->json('DELETE', 'api/cycles/'.$model->id, ['name' => 'Dave']);

        $response->assertStatus(200);
    }
}
