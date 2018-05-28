<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function rules()
    {
        $baseRules = [];

        if ($this->getMethod() === 'POST') {
            $baseRules['email'] = 'required|unique:users,email|email';
            $baseRules['name'] = 'required|max:255';
        }

        if ($this->getMethod() === 'PUT') {
            $baseRules['email'] = 'required|email|unique:users,email,'.$this->route('id');
        }

        if ($this->getMethod() === 'POST' || ($this->getMethod() === 'PUT' && $this->has('password'))) {
            $baseRules['password'] = 'required|min:5|max:20|confirmed';
        }

        return $baseRules;
    }

    public function authorize()
    {
        return true;
    }
}
