<?php

namespace App\Functional\Api\V1\Controllers;

use App\Models\User;
use App\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ForgotPasswordControllerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp()
    {
        parent::setUp();

        $this->user = new User([
            'name' => 'Test',
            'email' => 'test@email.com',
            'password' => '123456'
        ]);

        $this->user->save();
    }

    public function tearDown()
    {
        if ($this->user) {
            $this->user->delete();
        }

        parent::tearDown();
    }

    public function testForgotPasswordRecoverySuccessfully()
    {
        $this->post('api/auth/forgot', [
            'email' => 'test@email.com'
        ])->assertJson([
            'status' => 'ok'
        ])->isOk();
    }

    public function testForgotPasswordRecoveryReturnsUserNotFoundError()
    {
        $this->post('api/auth/forgot', [
            'email' => 'unknown@email.com'
        ])->assertJsonStructure([
            'error'
        ])->assertStatus(404);
    }

    public function testForgotPasswordRecoveryReturnsValidationErrors()
    {
        $this->post('api/auth/forgot', [
            'email' => 'i am not an email'
        ])->assertJsonStructure([
            'error'
        ])->assertStatus(422);
    }
}
