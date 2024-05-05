<?php

namespace App\Models;

use App\Models\Traits\HasCycle;
use App\Models\Traits\HasPackage;
use App\Models\Traits\HasService;
use App\Models\Traits\HasUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends Model
{
    use HasFactory, HasService, HasCycle, HasPackage, HasUser, SoftDeletes;

    protected $fillable = [
        'package_id',
        'user_id',
        'interval',
        'expires_at',
        'suspended_at',
        'status'
    ];
}
