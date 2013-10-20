<?php
Route::group(array('before' => 'superadmin'), function()
{
    Route::get('test',function(){

    });
    
    Route::get('members','MembersController@members');
    Route::post('members','MembersController@members_post');
    Route::get('members/create','MembersController@create');
    Route::post('members/create','MembersController@create_post');
    Route::get('members/update/{id}','MembersController@update');
    Route::post('members/update/{id}','MembersController@update_post');
    
    Route::get('members/packages/{id}','MembersController@packages');
    Route::post('members/packages/{id}','MembersController@packages_post');
    Route::get('members/packages/{id}/create','MembersController@create');
    Route::post('members/packages/{id}/create','MembersController@create_post');
    Route::get('members/packages/{id}/update/{package_id}','MembersController@update');
    Route::post('members/packages/{id}/update/{package_id}','MembersController@update_post');
    Route::get('members/packages/{id}/delete/{package_id}','MembersController@delete');
    Route::get('members/packages/{id}/attach','MembersController@attach');
    Route::post('members/packages/{id}/attach','MembersController@attach_post');
    Route::post('members/packages/{id}/delete','MembersController@delete_package');
    Route::post('members/packages/{id}/extend','MembersController@extend');
    Route::post('members/packages/{id}/suspend','MembersController@suspend');
    Route::post('members/search','MembersController@search');
    Route::get('members/login/{id}','MembersController@login');
    
    Route::post('members/delete','MembersController@delete'); 
    
    Route::get('members/request',function(){
        
        $per_page = 4;
        
        $page = Input::get('page',0);
        
        $rows = Member::all();
        
        $total_pages = ceil($rows->count()/$per_page);
        
        $offset = ($page == 0)? null : ($page - 1) * $per_page;
        
        $data = Member::orderBy('last_name')->take($per_page)->skip($offset)->get();

        $array = array(
            'page' => $page,
            'total_items' => $rows->count(),
            'total_pages' => $total_pages,
            'total_showing' => count($data),
            'members' => $data->toArray(),
        );
        $response = Response::make(json_encode($array,JSON_NUMERIC_CHECK),200);
        $response->header('Content-Type', 'text/json');
        return $response;
         
    });
       
});