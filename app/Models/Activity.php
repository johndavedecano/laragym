<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'entity_id',
        'type',
        'description'
    ];


    public function scopeEntity(Builder $query, $entity): Builder
    {
        if ($entity === 'user') {
            return $query->leftJoin('users', 'users.id', '=', 'activities.entity_id')->with('user');
        }

        return $query;
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'entity_id', 'id');
    }
}
