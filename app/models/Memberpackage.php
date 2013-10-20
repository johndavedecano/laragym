<?php
class Memberpackage extends Eloquent { 
    
    protected $table = 'members_packages';
    public $timestamps = false;
    
    public function member()
    {
        return $this->belongsTo('Member','member_id');
    }
    public function package()
    {
        return $this->belongsTo('Package','package_id');
    }
    /**
     * @return Checks if the member has this package then return the package object if exists. Return false if not
     */
    public static function still_has($member_id,$package_id)
    {
        $package = Memberpackage::where('member_id','=',$member_id)->where('package_id','=',$package_id);
        if($package->count() > 0){
            return $package;
        }else{
            return false;
        }
    }
}