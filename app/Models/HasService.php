<?php

namespace App\Models;

trait HasService
{
    public function service()
	{
		return $this->belongsTo('App\Models\Service');
	}
}