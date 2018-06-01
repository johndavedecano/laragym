<?php

namespace App\Models;

trait HasSubscriptions
{
    public function subscriptions()
	{
		return $this->hasMany('App\Models\Subscription');
	}
}