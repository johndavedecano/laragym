<?php

namespace App\Http\Requests;

use Config;
use Illuminate\Foundation\Http\FormRequest;

class CommonRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name'        => 'required',
            'description' => 'required',
            'status'      => 'in:active,inactive,deleted'
        ];
    }

    public function authorize()
    {
        return true;
    }
}
