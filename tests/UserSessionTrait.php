<?php

namespace Tests;

use App\Models\User;

trait UserSessionTrait
{
    public function getAdminAuth()
    {
        $user = User::factory()->create();
        $user->is_admin = true;
        $user->save();
        $token = $user->getPersonalAccessToken();

        return "Bearer $token";
    }

    public function getUserAuth()
    {
        $user = User::factory()->create();
        $user->save();
        $token = $user->getPersonalAccessToken();

        return "Bearer $token";
    }
}
