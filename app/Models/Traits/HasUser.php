<?php

namespace App\Models\Traits;

use App\Models\User;

trait HasUser
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
