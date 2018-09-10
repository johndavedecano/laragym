<?php

Route::group(['prefix' => 'v1'], function () {
    
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
        Route::get('refresh', [
            'middleware' => 'jwt.refresh',
            function () {
                return response()->json([
                    'message' => 'By accessing this endpoint, you can refresh your access token at each request. Check out this response headers!'
                ]);
            }
        ]);
    });
});
