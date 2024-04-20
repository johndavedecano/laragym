<?php

namespace App\Models\Traits;

use App\Models\Subscription;

trait HaveSubscriptions
{
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
