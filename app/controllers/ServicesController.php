<?php
class ServicesController extends BaseController {
    
    protected $layout = 'master';
    
    public function services(){
        
        $this->data['services'] = Service::orderBy('name')->paginate(10);
        
        return $this->layout->content =  View::make('services',$this->data);
    }
    
    public function services_post(){
        if(Request::ajax()){
            
            $data['response'] = 'validation_failed';
            
            $service_name = Input::get('service_name');
            $rules = array(
                'service_name' => 'required|unique:services,name'
            );
            
            $validator = Validator::make(Input::all(),$rules);
            
            if($validator->fails()){
                
                $data['errors'] =  $validator->getMessageBag()->toArray();
                $data['message'] = "Oops there was an error.";
                
            }else{
                
                $service = new Service;
                $service->name = strip_tags(ucwords($service_name));
                $service->save();
                
                $data['response'] = "ok";
                $data['message'] = "Service was successfully saved.";
                
            }
            
            $response = Response::make(json_encode($data),200);
            $response->header('Content-Type', 'text/json');
            return $response;
        }
        
        
    }
    
    public function update(){
        
        if(Request::ajax()){
            
            $data['response'] = 'validation_failed';
            
            $service_id = Input::get('service_id');
            $service_name = Input::get('service_name');
            $rules = array(
                'service_name' => 'required|unique:services,name,'.$service_id
            );
            
            $data['data'] = array(
                $service_id,
                $service_name
            );
            
            $validator = Validator::make(Input::all(),$rules);
            
            if($validator->fails()){
                
                $data['errors'] =  $validator->getMessageBag()->toArray();
                $data['message'] = "Oops there was an error.";
                
            }else{
                
                $service = Service::find($service_id);
                $service->name = strip_tags(ucwords($service_name));
                $service->save();
                
                $data['response'] = "ok";
                $data['message'] = "Service was successfully saved.";
                $data['service'] = $service->name;
                
            }
            
            $response = Response::make(json_encode($data),200);
            $response->header('Content-Type', 'text/json');
            return $response;
        }
    }
    
    public function delete(){
        if(Request::ajax()){
            
            $data['response'] = 'error';
            $data['content'] = "Item cannot be deleted.";
            $id = Input::get('service_id');
            
            $package = Package::where('service_id','=',$id)->count();
            
            if($package == 0){
                $service = Service::find($id);
                $service->delete();
                $data['response'] = 'ok';
                $data['content'] = "Item was successfully deleted.";
            }
            
            $response = Response::make(json_encode($data),200);
            $response->header('Content-Type', 'text/json');
            return $response;  
        }
    }
}