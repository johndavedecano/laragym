<?php

namespace App\Http\Requests;

use Config;
use Illuminate\Foundation\Http\FormRequest;

class SubscriptionRequest extends FormRequest
{
    public function rules()
    {
        return [
            'package_id'   => 'required|exists:packages,id',
            'user_id'      => 'required|exists:users,id',
            'interval'     => 'required|numeric|min:1',
            'suspended_at' => 'date_format:Y-m-d',
            'status'       => 'in:active,inactive,deleted,expired,suspended'
        ];
    }

    public function authorize()
    {
        return true;
    }
}
