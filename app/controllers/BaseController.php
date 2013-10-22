<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
    public $data = array();
    
    public function __construct()
    {
        if (Sentry::check())
        {
            // User is not logged in, or is not activated
             $this->data['admin'] = Sentry::getUser();
        }
    }
    
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

}