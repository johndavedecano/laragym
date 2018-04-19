<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Activity::class, function (Faker $faker) {
    return [
        'name' => 'User logged in'
    ];
});
