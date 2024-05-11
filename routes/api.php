<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['prefix' => 'auth'], function () {
    Route::post('register', 'AuthController@register')->name('auth.register');
    Route::post('login', 'AuthController@login')->name('auth.login');
    Route::post('logout', 'AuthController@logout')->middleware('auth:sanctum')->name('auth.logout');
    Route::post('refresh', 'AuthController@refresh')->middleware('auth:sanctum')->name('auth.refresh');
    Route::post('verify/{id}/{hash}', 'AuthController@verify')->name('verification.verify');
    Route::post('resend', 'AuthController@resend')->name('verification.resend');
    Route::post('forgot', 'AuthController@forgot')->name('auth.forgot');
    Route::post('reset', 'AuthController@reset')->name('password.reset');
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::group(['middleware' => ['admin']], function () {
        Route::apiResource('cycles', 'CycleController');
        Route::apiResource('services', 'ServiceController');
        Route::apiResource('branches', 'BranchController');
        Route::apiResource('packages', 'PackageController');
        Route::apiResource('subscriptions', 'SubscriptionController');
        Route::apiResource('users', 'UserController');
        Route::apiResource('users.branches', 'UserBranchController')->except(['show', 'update', 'destroy']);
        Route::apiResource('activities', 'ActivityController');
        Route::get('/stats/subscriptions', 'StatisticsController@subscriptions');
        Route::get('/stats/services', 'StatisticsController@services');
        Route::get('/stats/members', 'StatisticsController@members');
        Route::get('/stats/packages', 'StatisticsController@packages');
        Route::post('/users/{user}/avatar', 'UserAvatarController@store');
    });
});


