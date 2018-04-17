<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

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
