<?php

Route::group(['prefix' => 'auth'], function () {
    Route::post('signup', 'SignUpController@signUp');
    Route::post('login', 'LoginController@login');
    Route::post('recovery', 'ForgotPasswordController@sendResetEmail');
    Route::post('reset', 'ResetPasswordController@resetPassword');
    Route::post('logout', 'LogoutController@logout');
    Route::post('refresh', 'RefreshController@refresh');
});

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('me', 'UserController@me');
    Route::resource('cycles', 'CycleController');
    Route::resource('services', 'ServiceController');
    Route::resource('packages', 'PackageController');
    Route::resource('users', 'UserController');
    Route::resource('activities', 'ActivityController');
    Route::resource('subscriptions', 'SubscriptionController');
    Route::post('upload', 'ImageController@store');
});