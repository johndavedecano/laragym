<?php
class Setting extends Eloquent
{
   public $timestamps = false;
   
   /**
    * @return Gets the value of setting by name
    */
   public static function value($name = '')
   {
        $setting = Setting::where('name','=',$name)->first();
        if(is_object($setting))
        {
            return $setting->value;
        }else { return false; }
   }
   /**
    * @return string rule
    */
    public static function rule($name = '')
    {
        $setting = Setting::where('name','=',$name)->first();
        if(is_object($setting[0]))
        {
            return $setting->rule;
        }else { return false; }
    }
   
   
}