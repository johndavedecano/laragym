<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Exceptions\DefaultEntityException;
use App\Exceptions\SubscriptionException;

const NOT_FOUND = 404;
const UNAUTHORIZED = 401;
const BAD_REQUEST = 400;

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
            return response()->make(
                [
                    'error' => 'Resource not found.',
                    'status_code' => NOT_FOUND
                ],
                NOT_FOUND
            );
        });

        app('Dingo\Api\Exception\Handler')->register(function (AuthorizationException $exception) {
            return response()->make(
                [
                    'error' => 'You are not authorized to perform this action.',
                    'status_code' => UNAUTHORIZED
                ],
                UNAUTHORIZED
            );
        });

        app('Dingo\Api\Exception\Handler')->register(function (DefaultEntityException $exception) {
            return response()->make(
                [
                    'error' => $exception->message,
                    'status_code' => BAD_REQUEST
                ],
                BAD_REQUEST
            );
        });

        app('Dingo\Api\Exception\Handler')->register(function (SubscriptionException $exception) {
            return response()->make(
                [
                    'error' => $exception->message,
                    'status_code' => BAD_REQUEST
                ],
                BAD_REQUEST
            );
        });
    }
}
