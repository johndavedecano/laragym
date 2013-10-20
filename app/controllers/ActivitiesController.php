<?php
class ActivitiesController extends BaseController {
    
    protected $layout = 'master';
    
    public function activities(){
 
         $this->data['activities'] = Activity::orderBy('id','desc')->paginate(25);
         return $this->layout->content = View::make('activities',$this->data);
         
    }
}