<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 9/6/2018
 * Time: 9:25 PM
 */

namespace App\Exceptions;


class AuthException extends \Exception
{
    public $message = 'Unauthenticated.';

    public function __construct($message)
    {
        parent::__construct($message);

        $this->message = $message;
    }
}