<?php

namespace App\Functional\Api\V1\Controllers;

use Hash;
use App\Models\User;

trait UserLoginTrait
{
    public $token;

    public function login($email = 'admin@admin.com', $password = 'password', $admin = true)
    {
        $user = new User([
            'name' => 'Test User',
            'email' => $email,
            'password' => $password,
            'is_admin' => true,
        ]);

        $user->save();

        $response = $this->post('api/auth/login', [
            'email' => $email,
            'password' => $password
        ]);

        $response->assertStatus(200);

        $responseJSON = json_decode($response->getContent(), true);

        $this->token = $responseJSON['token'];

        $this->headers = [
            'Authorization' => 'Bearer ' . $this->token
        ];
    }
}
