<?php
Route::group(array('before' => 'superadmin'), function()
{
    Route::get('activities','ActivitiesController@activities');
    Route::post('activities/export','ActivitiesController@export');;
    Route::post('activities/delete','ActivitiesController@delete'); 
         
});