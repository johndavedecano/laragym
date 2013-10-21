<?php

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class UpdateMembers extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'command:update_members';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Update all expired people.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return void
	 */
	public function fire()
	{
		DB::table('members_packages')->whereRaw("UNIX_TIMESTAMP(expiration) <= ".strtotime("NOW"))->update(array('status' => 0));
        echo "Membership packages has been updated.";
        
        // SENDS EMAIL TO THE MEMBERS WITH EXPIRED PACKAGES
        if(Setting::value('email_users_expire') == 'yes')
        {
            // FIND THE MEMBERS
            $packages =  Memberpackage::where('status','=',0)->where('expiration','=',date("Y-m-d 00:00:00"))->get();
            
            foreach($packages as $package)
            {
                if($package->member->email != ''){
                    
                    $data = array(
                        'package' => $package->package->service->name,
                        'date' => date("F j,Y",strtotime($package->expiration)),
                        'name' => $package->member->first_name
                    );
                    
                    Mail::queue('emails.expired', $data, function($message) use ($package)
                    {
                        $message->to($package->member->email,$package->member->first_name)->subject('You package has expired.');
                        
                    });
                    
                }else{
                    // SEND THROUGH SMS INSTEAD ( FUTURE FEATURE)
                }
            }
        }
	}

}