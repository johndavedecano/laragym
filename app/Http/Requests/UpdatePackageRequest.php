<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePackageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'services.*' => 'required|integer|exists:services,id',
            'cycle_id' => 'integer|exists:cycles,id',
            'amount' => 'numeric',
            'name' => 'string|max:255',
            'status' => 'string|in:active,inactive,deleted'
        ];
    }
}
