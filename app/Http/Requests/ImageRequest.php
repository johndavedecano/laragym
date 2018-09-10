<?php

namespace App\Http\Requests;

use Config;
use Illuminate\Foundation\Http\FormRequest;

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
