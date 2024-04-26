<?php

namespace App\Models;

use App\Models\Traits\HasCycle;
use App\Models\Traits\HaveServices;
use App\Models\Traits\HaveSubscriptions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
    use HasFactory, HaveServices, HasCycle, HaveSubscriptions, SoftDeletes;

    protected $casts = [
        'cycle_id' => 'int',
        'amount' => 'float',
    ];

    protected $fillable = [
        'cycle_id',
        'amount',
        'name',
        'status'
    ];
}
