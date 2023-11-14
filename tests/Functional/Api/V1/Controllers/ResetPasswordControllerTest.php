<?php

namespace App\Functional\Api\V1\Controllers;

use DB;
use Config;
use App\Models\User;
use App\TestCase;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ResetPasswordControllerTest extends TestCase
{
    use RefreshDatabase;
    
    private $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = new User([
            'name' => 'Test',
            'email' => 'test@email.com',
            'password' => '123456'
        ]);
        $this->user->save();

        DB::table('password_resets')->insert([
            'email' => 'test@email.com',
            'token' => bcrypt('my_super_secret_code'),
            'created_at' => Carbon::now()
        ]);
    }

    public function tearDown()
    {
        if ($this->user) {
            $this->user->delete();
        }

        parent::tearDown();
    }

    public function testResetSuccessfully()
    {
        $this->post('api/auth/reset', [
            'email' => 'test@email.com',
            'token' => 'my_super_secret_code',
            'password' => 'mynewpass',
            'password_confirmation' => 'mynewpass'
        ])->assertStatus(200);
    }

    public function testResetSuccessfullyWithTokenRelease()
    {
        Config::set('boilerplate.reset_password.release_token', true);

        $this->post('api/auth/reset', [
            'email' => 'test@email.com',
            'token' => 'my_super_secret_code',
            'password' => 'mynewpass',
            'password_confirmation' => 'mynewpass'
        ])->isOk();
    }

    public function testResetReturnsProcessError()
    {
        $this->post('api/auth/reset', [
            'email' => 'unknown@email.com',
            'token' => 'this_code_is_invalid',
            'password' => 'mynewpass',
            'password_confirmation' => 'mynewpass'
        ])->assertStatus(500);
    }

    public function testResetReturnsValidationError()
    {
        $this->post('api/auth/reset', [
            'email' => 'test@email.com',
            'token' => 'my_super_secret_code',
            'password' => 'mynewpass'
        ])->assertStatus(422);
    }
}
