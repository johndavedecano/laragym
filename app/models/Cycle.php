<?php
class Cycle extends Eloquent {
    public $timestamps = false;
    public static function exists($cycle_id)
    {
        $service = Cycle::where('id','=',$cycle_id)->count();
        
        if($service > 0){
            return true;
        }else{
            return false;
        }
    }
}