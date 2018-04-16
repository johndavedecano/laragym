<?php

namespace App\Models;

trait HasPackage
{
    public function package()
	{
		return $this->belongsTo('App\Models\Package');
	}
}