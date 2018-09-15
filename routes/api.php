<?php

Route::group(['prefix' => 'auth'], function () {
    Route::post('signup', 'SignUpController@signUp');
    Route::post('login', 'LoginController@login');
    Route::post('forgot', 'ForgotPasswordController@forgot');
    Route::post('reset', 'ResetPasswordController@resetPassword')->name('password.reset');
    Route::post('logout', 'LogoutController@logout');
    Route::post('refresh', 'RefreshController@refresh');
});

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('me', 'UserController@me');
    Route::resource('cycles', 'CycleController');
    Route::resource('services', 'ServiceController');
    Route::resource('packages', 'PackageController');
    Route::resource('users', 'UserController');
    Route::resource('subscriptions', 'SubscriptionController');
    Route::post('upload', 'ImageController@store');

    Route::get('/stats/subscriptions', 'StatisticsController@subscriptions');
    Route::get('/stats/services', 'StatisticsController@services');
    Route::get('/stats/members', 'StatisticsController@members');
    Route::get('/stats/packages', 'StatisticsController@packages');


    Route::group(['prefix' => 'activities'], function() {
        Route::get('system', 'ActivityController@system');
        Route::get('attendance', 'ActivityController@attendance');
        Route::post('attendance', 'ActivityController@store');
        Route::delete('attendance/{id}', 'ActivityController@destroy');
        Route::get('attendance/{id}', 'ActivityController@show');
    });
});

