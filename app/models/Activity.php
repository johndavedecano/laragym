<?php
class Activity extends Eloquent {
    public $timestamps = false;
    
    public function member()
    {
        return $this->belongsTo('Member','member_id');
    }
}