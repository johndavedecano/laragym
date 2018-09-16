<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\Activity\ActivityService;
use App\Services\User\UserAuthService;

class LoginController extends Controller
{
    /**
     * @var UserAuthService
     */
    protected $authService;
    /**
     * LoginController constructor.
     * @param UserAuthService $authService
     */
    public function __construct(UserAuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        try {
            $user = $this->authService->login([
                'email' => $request->get('email'),
                'password' => $request->get('password'),
                'is_active' => 1,
            ]);

            $token = $this->authService->token($user);

            ActivityService::log($user->id, "$user->name has logged in to the system.");

            return response()
                ->json([
                    'status' => 'ok',
                    'token' => $token,
                    'user' => $user,
                    'expires_in' => auth()->guard()->factory()->getTTL() * 60
                ]);
        } catch (\Exception $exception) {
            return response()->json([
                'error' => $exception->getMessage(),
                'status' => 401
            ], 401);
        }
    }
}
