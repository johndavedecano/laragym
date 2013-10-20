<?php
class PackagesController extends BaseController {
    
    protected $layout = 'master';
    
    public function packages()
    {
        $this->data['cycles'] = Cycle::all();
        
        $this->data['services'] = Service::orderBy('name')->get();
       
        $this->data['packages'] = Package::paginate(25);
        
        return $this->layout->content = View::make('packages',$this->data);
        
    }
    public function packages_post(){
        
        $this->layout = '';
        
        $cycle_id = Input::get('cycle_id');
        $service_id = Input::get('service_id');
        $price = Input::get('price');
        
        if(!Package::exists($service_id,$cycle_id)){
            
            if(!empty($price) || is_numeric($price))
            {
                $package = new Package;
                $package->service_id = $service_id;
                $package->cycle_id = $cycle_id;
                $package->price = $price;
                $package->save();
                return Redirect::to('packages')->with('success','Package has been successfully saved.');
                   
            }else{
                return Redirect::to('packages')->with('error','Price must be a number.');
            }
            
        }else{
            return Redirect::to('packages')->with('error','Package already exists.');
        }
        
    }
    public function update_post(){
        
        $this->layout = '';
        
        if(Request::ajax())
        {
            $id = Input::get('id');
            $service = Input::get('service');
            $cycle = Input::get('cycle');
            $price = Input::get('price');
            $package = Package::find($id);
            $package->service_id = $service;
            $package->cycle_id = $cycle;
            $package->price = number_format($price,2);
            $package->save(); 
            echo 1;
        }
    }
    public function delete(){
        
        $this->layout = '';
        
        if(Request::ajax())
        {
            $package_id = Input::get('package_id');
            $package = Package::find($package_id);
            if(!empty($package) && Package::has_associated_members($package_id) == false){
                $package->delete();
                echo 1;
            }else{
                echo "Package cannot be deleted.";
            }
        }
    }
    
    public function expires()
    {
         $this->data['packages'] = Memberpackage::whereRaw("UNIX_TIMESTAMP(expiration) <= ".strtotime('NOW'))->orderBy('id','desc')->paginate(50);
         return $this->layout->content = View::make('packages_expires',$this->data);
    }
}