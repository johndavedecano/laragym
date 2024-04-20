<?php

namespace App\Models;

use App\Models\Traits\HasCycle;
use App\Models\Traits\HasPackage;
use App\Models\Traits\HasService;
use App\Models\Traits\HasUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory, HasService, HasCycle, HasPackage, HasUser;
}
