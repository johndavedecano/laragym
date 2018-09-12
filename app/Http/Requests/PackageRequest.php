<?php

namespace App\Http\Requests;

use Config;
use Illuminate\Foundation\Http\FormRequest;

class PackageRequest extends FormRequest
{
    public function rules()
    {
        return [
            'amount'      => 'required|numeric',
            'cycle_id'    => 'required|exists:cycles,id',
            'name'        => 'required|max:126',
            'service_id'  => 'required|exists:services,id',
            'status'      => 'in:active,inactive,deleted'
        ];
    }

    public function authorize()
    {
        return true;
    }
}
