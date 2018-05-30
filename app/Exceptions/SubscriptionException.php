<?php

namespace App\Exceptions;

use Exception;

class SubscriptionException extends Exception
{
    public $message = 'You cannot delete an entity that has existing subscriptions.';

    public function __construct($message)
    {
        parent::__construct($message);
        $this->message = $message;
    }
}
