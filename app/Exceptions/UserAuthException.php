<?php

namespace App\Exceptions;


class UserAuthException extends \Exception
{
    protected string $details;

    public function __construct(string $details)
    {
        $this->details = $details;
        parent::__construct();
    }

    public function __toString(): string
    {
        return $this->details;
    }
}
