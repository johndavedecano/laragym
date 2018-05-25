<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class ImageRequest extends FormRequest
{
    public function rules()
    {
        return [
            'file' => 'required|file|mimes:jpeg,png,jpg|max:2048'
        ];
    }

    public function authorize()
    {
        return true;
    }
}
