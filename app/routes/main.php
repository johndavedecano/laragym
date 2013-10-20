<?php
Route::group(array('before' => 'superadmin'), function()
{
    Route::get('/','HomeController@main');
    
});