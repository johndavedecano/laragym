<?php

namespace App\Models;

trait HasSubscriptions
{
    public function subscriptions()
	{
		return $this->belongsTo('App\Models\Subscription');
	}
}