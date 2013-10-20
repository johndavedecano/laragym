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
}