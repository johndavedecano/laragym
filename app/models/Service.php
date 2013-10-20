<?php
class Service extends Eloquent { 
    public $timestamps = false;
    public static function exists($service_id)
    {
        $service = Service::where('id','=',$service_id)->count();
        
        if($service > 0){
            return true;
        }else{
            return false;
        }
    }
}