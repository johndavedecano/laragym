<?php
Route::get('/login','AuthController@login');
Route::post('/login',array('before' => 'csrf_header','uses' => 'AuthController@login_post'));
Route::get('/logout',function(){ 
    Sentry::logout();
    return Redirect::to('/');
 });
//Route::get('/forgot','AuthController@forgot');csrf_header
//Route::post('/login_post',array('before' => 'csrf','uses' => 'AuthController@forgot_post'));