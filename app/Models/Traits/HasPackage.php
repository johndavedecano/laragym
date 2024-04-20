<?php

namespace App\Models\Traits;

use App\Models\Package;

trait HasPackage
{
    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}
