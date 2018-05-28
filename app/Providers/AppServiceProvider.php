<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        app('Dingo\Api\Exception\Handler')->register(function (ModelNotFoundException $exception) {
            return response()->make(['error' => 'Resource not found.'], 404);
        });

        app('Dingo\Api\Exception\Handler')->register(function (AuthorizationException $exception) {
            return response()->make(['error' => 'You are not authorized to perform this action.'], 401);
        });
    }
}
