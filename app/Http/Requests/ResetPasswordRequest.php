<?php

namespace App\Http\Requests;

use Config;
use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function rules()
    {
        return Config::get('boilerplate.reset_password.validation_rules');
    }

    public function authorize()
    {
        return true;
    }
}
