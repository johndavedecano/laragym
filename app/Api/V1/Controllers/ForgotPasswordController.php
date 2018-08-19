<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Services\User\UserAuthService;
use App\Api\V1\Requests\ForgotPasswordRequest;

/**
 * Class ForgotPasswordController
 * @package App\Api\V1\Controllers
 */
class ForgotPasswordController extends Controller
{
    /**
     * @var UserAuthService
     */
    protected $authService;

    /**
     * ForgotPasswordController constructor.
     * @param UserAuthService $authService
     */
    public function __construct(UserAuthService $authService)
    {
        $this->authService = $authService;
    }

    public function sendResetEmail(ForgotPasswordRequest $request)
    {
        $this->authService->forgot($request->get('email'));

        return response()->json([
            'status' => 'ok'
        ], 200);
    }

}
