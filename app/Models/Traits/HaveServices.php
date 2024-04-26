<?php

namespace App\Models\Traits;

use App\Models\Service;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HaveServices
{
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class);
    }
}
