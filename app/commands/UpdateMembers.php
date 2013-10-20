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
	}

}