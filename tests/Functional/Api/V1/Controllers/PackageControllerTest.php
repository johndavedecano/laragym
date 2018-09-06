<?php

namespace App\Functional\Api\V1\Controllers;

use Hash;
use App\Functional\Api\V1\Controllers\UserLoginTrait;
use App\Models\Package;
use App\Models\Service;
use App\Models\Cycle;
use App\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PackageControllerTest extends TestCase
{
    use RefreshDatabase;

    use UserLoginTrait;

    public function setUp()
    {
        parent::setUp();

        $this->login('admin@admin.com', 'password');

        $service = Service::create(['name' => 'Dave']);

        $cycle = Cycle::create(['name' => 'Dave']);

        $this->model = new Package();

        $this->model->unguard();

        $this->package = [
            'amount'      => 25,
            'cycle_id'    => $cycle->id,
            'is_archived' => false,
            'name'        => 'Package 1',
            'service_id'  => $cycle->id,
        ];
    }

    public function testIndexFails()
    {
        $response = $this->get('api/packages');

        $response->assertStatus(401);
    }

    public function testIndexSuccess()
    {
        $this->get('api/packages', $this->headers)->isOk();
    }

    public function testStoreFails()
    {
        $response = $this->withHeaders($this->headers)->json('POST', 'api/packages', []);

        $response->assertStatus(422);
    }

//    public function testStoreSuccess()
//    {
//        $response = $this->withHeaders($this->headers)->json('POST', 'api/packages', $this->package);
//
//        $response->assertStatus(201);
//    }

    public function testUpdateFailsValidation()
    {
        $model = $this->model->create($this->package);

        $response = $this->withHeaders($this->headers)->json('PUT', 'api/packages/'.$model->id, []);

        $response->assertStatus(422);
    }

//    public function testUpdateFailsNotFound()
//    {
//        $response = $this->withHeaders($this->headers)->json('PUT', 'api/packages/35729582', $this->package);
//
//        $response->assertStatus(404);
//    }
//
//    public function testUpdateSuccess()
//    {
//        $model = $this->model->create($this->package);
//
//        $response = $this->withHeaders($this->headers)->json('PUT', 'api/packages/'.$model->id, $this->package);
//
//        $response->assertStatus(200);
//    }

    public function testDestroyFailsNotFound()
    {
        $response = $this->withHeaders($this->headers)->json('DELETE', 'api/packages/35729582', $this->package);

        $response->assertStatus(404);
    }

    public function testDestroySuccess()
    {
        $model = $this->model->create($this->package);

        $response = $this->withHeaders($this->headers)->json('DELETE', 'api/packages/'.$model->id, $this->package);

        $response->assertStatus(200);
    }
}
