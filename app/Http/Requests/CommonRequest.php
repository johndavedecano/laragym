<?php

namespace App\Http\Requests;

use Config;
use Illuminate\Foundation\Http\FormRequest;

class CommonRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|max:255',
        ];
    }

    public function authorize()
    {
        return true;
    }
}
