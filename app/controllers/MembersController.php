<?php
class MembersController extends BaseController {
    
    protected $layout = 'master';
    
    public function members(){
        return $this->layout->content = View::make('members',$this->data);
    }
    
    public function search()
    {
        $keyword = Input::get('keyword');
        // REDIRECT BACK TO HOMEPAGE IF EMPTY
        if(empty($keyword)){
            return Redirect::to('/');
        }
        
        $this->data['members'] = Member::where('last_name','LIKE',"%$keyword%")
                            ->orWhere('first_name','LIKE',"%$keyword%")
                            ->orWhere('number','LIKE',"%$keyword%")
                            ->orderBy('last_name')
                            ->get();
        
        return $this->layout->content = View::make('members_search',$this->data);
    }
    public function login($member_id)
    {
        
        $this->layout = '';
        
        $member = Member::find($member_id);
        
        if(!empty($member) && is_object($member))
        {
            if($member->memberpackages->count() > 0){
                $activity = new Activity;
                $activity->member_id = $member_id;
                $activity->timestamp = date("Y-m-d H:i:s");
                $activity->save();
                return Redirect::to('/');
            }else{
                return Redirect::to('/')->with('error','Member doesnt have any package.');
            }
        }else{ return Redirect::to('/'); }
    }
    public function create(){
        return $this->layout->content = View::make('members_create',$this->data);
    }
    public function create_post(){
        
        $this->layout = '';
        
        $rules = array(
            'first_name' => 'required',
            'last_name' => 'required',
            'email'     => 'email|unique:members,email',
            'photo' => 'mimes:jpeg,bmp,png|max:200',
            'dob' => 'date_format:Y-m-d',
        );
        
        $validator = Validator::make(Input::all(),$rules);
        
        if($validator->fails()){
            
            return Redirect::to('members/create')->withInput()->withErrors($validator);
            
        }else{
            $filename = '';
            if(Input::hasFile('photo')){
                $file = Input::file('photo');             
                $filename = Input::file('photo')->getClientOriginalName();
                $extension = substr(strrchr($filename,'.'),1);
                $newname = strtolower(md5(date("Y-m-d").Input::get('username')).'.'.$extension);
                $uploadStatus = Input::file('photo')->move(Config::get('app.upload_path'),$newname);
                if($uploadStatus){ $filename = $newname; } 
       
            }
            
            $member = new Member;
            $member->number = date("YmdHis");
            $member->first_name = Input::get('first_name');
            $member->last_name = Input::get('last_name');
            $member->address = Input::get('address');
            $member->phone = Input::get('phone');
            $member->dob = Input::get('dob');
            $member->email = Input::get('email');
            $member->photo = $filename;
            $member->save();
            
            return Redirect::to('members/create')->with('success','Member has been created.');
        }   
    }
    public function update(){
        
        $this->data['member'] = Member::find(Request::segment(3));
        
        if(empty($this->data['member'])){
            return Redirect::to('members')->with('error','Member was not found.');
        }
        //print_r($this->data['member'] );
        return $this->layout->content = View::make('members_update',$this->data);
    }
    public function update_post(){
        
        $this->data['member'] = Member::find(Request::segment(3));
        
        if(empty($this->data['member'])){
            return Redirect::to('members')->with('error','Member was not found.');
        }
        
        $this->layout = '';
        
        $rules = array(
            'first_name' => 'required',
            'last_name' => 'required',
            'email'     => 'email|unique:members,email,'.$this->data['member']->id,
            'photo' => 'mimes:jpeg,bmp,png|max:200',
            'dob' => 'date_format:Y-m-d',
        );
        
        $validator = Validator::make(Input::all(),$rules);
        
        if($validator->fails()){
            
            return Redirect::to('members/create')->withInput()->withErrors($validator);
            
        }else{
            $filename = $this->data['member']->photo;
            if(Input::hasFile('photo')){
                $file = Input::file('photo');             
                $filename = Input::file('photo')->getClientOriginalName();
                $extension = substr(strrchr($filename,'.'),1);
                $newname = strtolower(md5(date("Y-m-d").Input::get('username')).'.'.$extension);
                $uploadStatus = Input::file('photo')->move(Config::get('app.upload_path'),$newname);
                if($uploadStatus){ $filename = $newname; } 
       
            }
            
            $member = Member::find(Request::segment(3));
            $member->number = strtotime(date("Y-m-d-H:i:s"));
            $member->first_name = Input::get('first_name');
            $member->last_name = Input::get('last_name');
            $member->address = Input::get('address');
            $member->phone = Input::get('phone');
            $member->dob = Input::get('dob');
            $member->email = Input::get('email');
            $member->photo = $filename;
            $member->save();
            
            return Redirect::to('members')->with('success','Member has been updated.');
        }   
    }
    
    public function packages($member_id)
    {
        $member = Member::find($member_id);
        if(empty($member) || !is_object($member)){
            return Redirect::to('members')->with("error","Member doesnt exists.");
        }
        
        $packages = Memberpackage::where('member_id','=',$member->id)->paginate(15);
        $this->data['member'] = $member;
        $this->data['packages'] = $packages;
        
        return $this->layout->content = View::make('members_packages',$this->data);
        
    }
    
    public function attach()
    {
        $member_id = Request::segment(3);
        
        $member = Member::find($member_id);
        if(empty($member) || !is_object($member)){
            return Redirect::to('members')->with("error","Member doesnt exists.");
        }
        $this->data['packages'] = Package::all();
        if(Package::count() == 0){
            return Redirect::to('members/packages/'.$member_id)->with("error","No Available Packages.");
        }
        $this->data['member'] = $member;
        return $this->layout->content = View::make('members_packages_attach',$this->data);
    }
    
    public function attach_post()
    {
        $this->layout = '';
        
        $member_id = Request::segment(3);
        
        $package_id = Input::get('package_id');
        
        $package = Package::find($package_id);
        
        $member = Member::find($member_id);
        
        if(empty($member) || !is_object($member)){
            return Redirect::to('members')->with("error","Member doesnt exists.");
        }
        
        $rules = array('package_id' => 'required|numeric');
        
        $validator = Validator::make(Input::all(),$rules);
        
        if($validator->fails()){
            return Redirect::to('members/packages/'.$member_id.'/attach')->withErros($validator);
        }else{
            if(empty($package)){
                return Redirect::to('members/packages/'.$member_id)->with('error','Package doenst exists');
            }else{
                // IF MEMBER IS STILL HAVING THE SAME KIND OF PACKAGE
                if(Memberpackage::still_has($member_id,$package_id) ==  false)
                {
                    $member_package = new Memberpackage;
                    $member_package->member_id = $member_id;
                    $member_package->package_id = $package_id;
                    
                    // SET THE EXPIRATION DATE
                    if($package->cycle->name == 'monthly')
                    {
                        $expiration = strtotime(date("Y-m-d")) + (30 * 86400);
                        $member_package->expiration = date('Y-m-d', $expiration);
                    }
                    
                    if($package->cycle->name == 'annually')
                    {
                        $expiration = strtotime(date("Y-m-d")) + (365 * 86400);
                        $member_package->expiration = date('Y-m-d',$expiration);
                    }
                    // REGISTRATION DATE
                    $member_package->registration = date("Y-m-d");
                    $member_package->status = 1;
                    $member_package->save();
                    return Redirect::to('members/packages/'.$member_id)->with('success','Package has been attached to the member.');
                    
                }else{
                    return Redirect::to('members/packages/'.$member_id.'/attach')->with('error','Sorry the package is still associated with the member.');
                }
            }
        }
    }
    
    public function suspend()
    {
        $this->layout = '';
        $memberpackage = Memberpackage::find(Input::get('package_id'));
        if($memberpackage->status == 1){
            
            $memberpackage->status = 0;
            $memberpackage->suspended_at = date("Y-m-d");
            $memberpackage->save();
            echo 1;
            
        }else{
            
            if($memberpackage->package->cycle->name == 'monthly')
            {
                $memberpackage->status = 1;
                $expiration = strtotime("now") + (30 * 86400);
                $memberpackage->expiration = date('Y-m-d', $expiration);
                $memberpackage->save();
            }
            
            if($memberpackage->package->cycle->name == 'annually')
            {
                $memberpackage->status = 1;
                $expiration = strtotime("now") + (365 * 86400);
                $memberpackage->expiration = date('Y-m-d',$expiration);
                $memberpackage->save();
            }
            echo 1;
        }
        
    }
    
    public function extend()
    {
        $this->layout = '';
        $member_package = Memberpackage::find(Input::get('package_id'));
        
        // SET THE EXPIRATION DATE
        if($member_package->package->cycle->name == 'monthly')
        {
            $expiration = strtotime($member_package->expiration) + (30 * 86400);
            $member_package->expiration = date('Y-m-d', $expiration);
        }
        
        if($member_package->package->cycle->name == 'annually')
        {
            $expiration = strtotime($member_package->expiration) + (365 * 86400);
            $member_package->expiration = date('Y-m-d',$expiration);
        }
        $member_package->save();
        echo 1;
    }
    
    public function delete_package()
    {
        $this->layout = '';
        $package_id = Input::get('package_id');
        $memberpackage = Memberpackage::find($package_id);
        $memberpackage->delete();
        echo 1;
    }
}