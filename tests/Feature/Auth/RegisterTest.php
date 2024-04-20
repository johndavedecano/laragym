<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_validation_error()
    {
        $response = $this->post('/api/auth/register', [], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(422);
    }

    public function test_success_registration()
    {
        $response = $this->post('/api/auth/register', [
            'email' => 'test@test.com',
            'name' => 'John Dave Decano',
            'password' => 'password',
            'password_confirmation' => 'password'
        ], [
            'Accept' => 'application/json'
        ]);

        $response->assertStatus(201);
    }
}
