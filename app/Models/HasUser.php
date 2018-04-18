<?php

namespace App\Models;

trait HasUser
{
    public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
}