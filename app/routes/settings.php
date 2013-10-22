<?php
Route::group(array('before' => 'superadmin'), function()
{
    Route::get('settings','SettingsController@settings');
    Route::post('settings','SettingsController@settings_post');
    Route::post('settings/admin','SettingsController@admin_post');
       
});