<?php

namespace App\Exceptions;

use Exception;

class DefaultEntityException extends Exception
{
    public $message = 'You are not allowed to delete a default entity.';

    public function __construct($message)
    {
        parent::__construct($message);
        $this->message = $message;
    }
}
