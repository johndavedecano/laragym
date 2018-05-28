<?php

namespace App\Policies;

trait HasAdmin
{
    public function before($user, $ability)
    {
        return $user->is_admin;
    }
}
