<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function rules()
    {
        $baseRules = [
            'name' => 'required|max:255',
            'email' => 'required|unique:users,email|email',
            'avatar' => 'url',
        ];

        $passRules = 'required|min:5|max:20|confirmed';

        if ($this->getMethod() === 'POST' || ($this->getMethod() === 'PUT' && $this->has('password'))) {
            $baseRules['password'] = $passRules;
        }

        return $baseRules;
    }

    public function authorize()
    {
        return true;
    }
}
