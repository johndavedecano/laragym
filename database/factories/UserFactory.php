<?php

use Faker\Generator as Faker;

use Illuminate\Support\Facades\Hash;

$factory->define(App\Models\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => 'password',
        'avatar' => 'https://www.gravatar.com/avatar/' . md5($faker->unique()->safeEmail),
        'account_number' => date('YmdHis')
    ];
});