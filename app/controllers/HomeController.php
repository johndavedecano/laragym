<?php
class HomeController extends BaseController {

	protected $layout = 'master';
    
    public function main()
	{
         $this->data['activities'] = Activity::where(DB::raw("DATE(timestamp)"),'=',date("Y-m-d"))->orderBy('id','desc')->paginate(25);
         $this->data['packages'] = Memberpackage::whereRaw("UNIX_TIMESTAMP(expiration) <= ".strtotime('NOW'))->take(15)->get();
         $this->data['total_members'] = Member::count();
         $this->data['total_packages'] = Package::count();
         $this->data['total_services'] = Service::count();
         return $this->layout->content = View::make('main',$this->data);
	}

}