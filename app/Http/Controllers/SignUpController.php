<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignUpRequest;
use App\Http\Controllers\Controller;
use App\Services\User\UserAuthService;
use Illuminate\Support\Facades\Config;

/**
 * Class SignUpController
 * @package App\Http\Controllers
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
                'token' => ''
            ], 201);
        }

        return response()->json([
            'status' => 'ok',
            'token' => $this->authService->token($user),
        ], 201);
    }
}
