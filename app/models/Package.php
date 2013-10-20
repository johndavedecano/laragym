<?php
class Package extends Eloquent { 
    
    public $timestamps = false;
    
    public function service()
    {
        return $this->belongsTo('Service');
    }
    
    public function cycle()
    {
        return $this->belongsTo('Cycle');
    }
    
    public static function exists($service_id,$cycle_id)
    {
        $count =  Package::where('service_id','=',$service_id)->where('cycle_id','=',$cycle_id)->count();
        
        if($count > 0){
            return true;
        }else{
            return false;
        }
    }
    
    public static function has_associated_members($package_id)
    {
        $member_packages = Memberpackage::where('package_id','=',$package_id)->count();
        
        if($member_packages > 0){
            return true;
        }else{ return false; }
    }

}