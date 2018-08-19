<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Requests\ResetPasswordRequest;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\User\UserAuthService;
use Config;
use Illuminate\Support\Facades\Password;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;

class ResetPasswordController extends Controller
{
    /**
     * @var UserAuthService
     */
    protected $authService;

    /**
     * ResetPasswordController constructor.
     * @param UserAuthService $authService
     */
    public function __construct(UserAuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @param ResetPasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        $user = $this->authService->reset($this->credentials($request));

        if(!Config::get('boilerplate.reset_password.release_token')) {
            return response()->json([
                'status' => 'ok',
            ]);
        }

        return response()->json([
            'status' => 'ok',
            'token' => $this->authService->token($user),
        ]);
    }

    /**
     * Get the password reset credentials from the request.
     *
     * @param  ResetPasswordRequest  $request
     * @return array
     */
    protected function credentials(ResetPasswordRequest $request)
    {
        return $request->only(
            'email', 'password', 'password_confirmation', 'token'
        );
    }
}
