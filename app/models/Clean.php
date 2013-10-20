<?php
class Clean extends Input {
    
    public static function get($key = NULL, $default = NULL,$xss =true){
        
        if($xss){
            return Static::get($key,$default);
        }else{
            return Static::get($key,$default);
        }
    }
}