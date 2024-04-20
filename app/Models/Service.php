<?php

namespace App\Models;

use App\Models\Traits\HaveSubscriptions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory, HaveSubscriptions;
}
