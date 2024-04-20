<?php

namespace App\Models\Traits;

use App\Models\Cycle;

trait HasCycle
{
    public function cycle()
    {
        return $this->belongsTo(Cycle::class);
    }
}
