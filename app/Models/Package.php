<?php

namespace App\Models;

use App\Models\Traits\HasCycle;
use App\Models\Traits\HasService;
use App\Models\Traits\HaveSubscriptions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
    use HasFactory, HasService, HasCycle, HaveSubscriptions, SoftDeletes;

    protected $casts = [
        'service_id' => 'int',
        'cycle_id' => 'int',
        'amount' => 'float',
    ];

    protected $fillable = [
        'service_id',
        'cycle_id',
        'amount',
        'name',
        'status'
    ];
}
