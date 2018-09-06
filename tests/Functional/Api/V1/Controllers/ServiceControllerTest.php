<?php

namespace App\Functional\Api\V1\Controllers;

use Hash;
use App\Models\Service;
use App\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use App\Functional\Api\V1\Controllers\UserLoginTrait;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ServiceControllerTest extends TestCase
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
        $response = $this->get('api/services');

        $response->assertStatus(401);
    }

    public function testIndexSuccess()
    {
        $this->get('api/services', $this->headers)->isOk();
    }

    public function testStoreFails()
    {
        $response = $this->withHeaders($this->headers)->json('POST', 'api/services', []);

        $response->assertStatus(422);
    }

    public function testStoreSuccess()
    {
        $response = $this->withHeaders($this->headers)->json('POST', 'api/services', ['name' => 'Dave']);

        $response->assertStatus(201);
    }

    public function testUpdateFailsValidation()
    {
        $model = Service::create(['name' => 'Dave']);

        $response = $this->withHeaders($this->headers)->json('PUT', 'api/services/'.$model->id, []);

        $response->assertStatus(422);
    }

    public function testUpdateFailsNotFound()
    {
        $response = $this->withHeaders($this->headers)->json('PUT', 'api/services/35729582', ['name' => 'Dave']);

        $response->assertStatus(404);
    }

    public function testUpdateSuccess()
    {
        $model = Service::create(['name' => 'Dave']);

        $response = $this->withHeaders($this->headers)->json('PUT', 'api/services/'.$model->id, ['name' => 'Dave']);

        $response->assertStatus(200);
    }

    public function testDestroyFailsDefault()
    {
        $model = Service::create(['name' => 'Dave', 'is_default' => true]);

        $response = $this->withHeaders($this->headers)->json('DELETE', 'api/services/'.$model->id);

        $response->assertStatus(400);
    }

    public function testDestroyFailsNotFound()
    {
        $response = $this->withHeaders($this->headers)->json('DELETE', 'api/services/35729582', ['name' => 'Dave']);

        $response->assertStatus(404);
    }

    public function testDestroySuccess()
    {
        $model = Service::create(['name' => 'Dave']);

        $response = $this->withHeaders($this->headers)->json('DELETE', 'api/services/'.$model->id, ['name' => 'Dave']);

        $response->assertStatus(200);
    }
}
