<?php

namespace App\Models;

use App\Models\Traits\HaveSubscriptions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, HaveSubscriptions, SoftDeletes;

    protected $fillable = [
        'name',
        'status',
        'description',
    ];
}
