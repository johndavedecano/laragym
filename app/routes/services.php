<?php
Route::group(array('before' => 'superadmin'), function()
{
    Route::get('services','ServicesController@services');
    Route::post('services','ServicesController@services_post');
    Route::post('services/update','ServicesController@update');
    Route::post('services/delete','ServicesController@delete'); 
       
});