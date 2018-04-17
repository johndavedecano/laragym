<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class PackageRequest extends FormRequest
{
    public function rules()
    {
        return [
            'service_id' => 'required|exists:services,id',
            'cycle_id'   => 'required|exists:cycles,id',
            'name'       => 'required|max:255',
            'amount'     => 'required|numeric'
        ];
    }

    public function authorize()
    {
        return true;
    }
}
