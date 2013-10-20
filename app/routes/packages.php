<?php
Route::group(array('before' => 'superadmin'), function()
{
    Route::get('packages','PackagesController@packages');
    Route::post('packages','PackagesController@packages_post');
    Route::get('packages/create','PackagesController@create');
    Route::post('packages/create','PackagesController@create_post');
    Route::get('packages/update','PackagesController@update');
    Route::post('packages/update','PackagesController@update_post');
    Route::post('packages/delete','PackagesController@delete'); 
    Route::get('packages/expires','PackagesController@expires'); 
       
});