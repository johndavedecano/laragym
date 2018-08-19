<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Requests\SignUpRequest;
use App\Http\Controllers\Controller;
use App\Services\User\UserAuthService;

/**
 * Class SignUpController
 * @package App\Api\V1\Controllers
 */
class SignUpController extends Controller
{
    /**
     * @var UserAuthService
     */
    protected $authService;

    /**
     * SignUpController constructor.
     * @param UserAuthService $authService
     */
    public function __construct(UserAuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @param SignUpRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signUp(SignUpRequest $request)
    {
        $user = $this->authService->register($request->all());

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
}
