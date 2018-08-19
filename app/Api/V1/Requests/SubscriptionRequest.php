<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class SubscriptionRequest extends FormRequest
{
    public function rules()
    {
        return [
            'package_id' => 'required|exists:packages,id',
            'user_id' => 'required|exists:users,id',
            'interval' => 'required|numeric|min:1',
            'suspended_at' => 'date_format:Y-m-d',
        ];
    }

    public function authorize()
    {
        return true;
    }
}
