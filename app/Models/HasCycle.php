<?php

namespace App\Models;

trait HasCycle
{
    public function cycle()
	{
		return $this->belongsTo('App\Models\Cycle');
	}
}