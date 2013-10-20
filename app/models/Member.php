<?php
class Member extends Eloquent {
    
    protected $appends = array('thumbnail');
    
    public function getThumbnailAttribute(){
        
        $photo = ($this->photo != '') ? $this->photo : 'default.jpg';
        
        return $this->attributes['thumbnail'] = URL::to('uploads/timthumb.php?src=').URL::to('uploads/'.$photo).'&w=50&h=50';
    }
    
    public function memberpackages()
    {
        return $this->hasMany('Memberpackage','member_id');
    }
    
}