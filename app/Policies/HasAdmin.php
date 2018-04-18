<?php

namespace App\Policies;

trait HasAdmin
{
    public function before($user, $ability)
    {
        if ($user->is_admin) {
            return true;
        }
    }
}
