<?php
class SettingsController extends BaseController {
    protected $layout = 'master';
    public function settings(){
        
        
        $this->data['settings'] =  Setting::orderBy('name')->get();
        return $this->layout->content = View::make('settings',$this->data);
        
    }
    
    public function settings_post(){
        
        $this->layout = '';
        
        $options = Input::all();
        
        $rules = array();
        
        foreach($options as $k => $v)
        {
            $r = Setting::rule($k);
            if($r != false)
            {
                $rules[$k] = $r;
            }  
        }
        
        $validator = Validator::make(Input::all(),$rules);
        if($validator->fails())
        {
            return Redirect::to('settings')->withErrors($validator);
        }else{
            
            foreach($options as $k => $v)
            {
                DB::table('settings')->where('name',$k)->update(array('value' => $v));
            }
            return Redirect::to('settings')->with('success','Settings has been successfully updated.');
        }
        
    }
    
    public function admin_post()
    {
        $rules = array(
            'email' => 'required|email'
        );
        
        if(Input::has('password')){
            $rules['password'] = 'confirmed|required|min:6:max:12';
        }
        
        $validator = Validator::make(Input::all(),$rules);
        
        if($validator->fails())
        {
            return Redirect::to('settings')->withErrors($validator)->withInput();
        }else{
            try
            {
                // Find the user using the user id
                $user = Sentry::getUserProvider()->findById($this->data['admin']->id);
            
                // Update the user details
                $user->email = Input::get('email');
                $user->first_name = Input::get('password');
            
                // Update the user
                if ($user->save())
                {
                   return Redirect::to('settings')->with('success','User information was updated.'); 
                }
                else
                {
                    return Redirect::to('settings')->with('error','User information was not updated.');
                }
            }
            catch (Cartalyst\Sentry\Users\UserExistsException $e)
            {
                return Redirect::to('settings')->with('error','User with this login already exists.');
            }
            catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
            {
                return Redirect::to('settings')->with('error','User was not found.');
            }
        }
    }
}