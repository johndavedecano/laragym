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
        Route::resource('cycles', 'CycleController');
        // Route::resource('services', 'ServiceController');
        // Route::resource('packages', 'PackageController');
        // Route::resource('users', 'UserController');
        // Route::resource('subscriptions', 'SubscriptionController');
        // Route::post('upload', 'ImageController@store');
        // Route::get('/stats/subscriptions', 'StatisticsController@subscriptions');
        // Route::get('/stats/services', 'StatisticsController@services');
        // Route::get('/stats/members', 'StatisticsController@members');
        // Route::get('/stats/packages', 'StatisticsController@packages');
        // Route::group(['prefix' => 'activities'], function () {
        //     Route::get('system', 'ActivityController@system');
        //     Route::get('attendance', 'ActivityController@attendance');
        //     Route::post('attendance', 'ActivityController@store');
        //     Route::delete('attendance/{id}', 'ActivityController@destroy');
        //     Route::get('attendance/{id}', 'ActivityController@show');
        // });
    });
});
