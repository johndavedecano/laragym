<?php

namespace App\Models\Traits;

use App\Models\Service;

trait HasService
{
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
