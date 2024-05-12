<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResendRequest;
use App\Http\Requests\Auth\ResetRequest;
use App\Models\User;
use App\Services\UserAuthService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private UserAuthService $userAuthService;

    public function __construct()
    {
        $this->userAuthService = new UserAuthService();
    }

    public function register(RegisterRequest $request)
    {
        $this->userAuthService->register($request->email, $request->password, $request->name);

        return response()->json([
            'success' => true
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        try {
            $token = $this->userAuthService->login($request->email, $request->password);

            $user = User::where('email', $request->email)->firstOrFail();

            return response()->json([
                'success' => true,
                'token_type' => 'Bearer',
                'access_token' => $token,
                'user' => $user
            ]);
        } catch (AuthenticationException $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
                'success' => false
            ], 401);
        }
    }


    public function refresh(Request $request)
    {
        $user = $request->user();

        $token = $user->getPersonalAccessToken();

        return response()->json([
            'success' => true,
            'token_type' => 'Bearer',
            'access_token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $this->userAuthService->logout($request->user());

        return response()->json([
            'success' => true
        ]);
    }

    public function forgot(ForgotRequest $request)
    {
        $status = $this->userAuthService->forgot($request->email);

        return $status === true
            ? response()->json(['success' => true])
            : response()->json(['message' => 'unable to process request', 'success' => false], 400);
    }

    public function reset(ResetRequest $request)
    {
        $status = $this->userAuthService->reset($request->toArray());

        return $status === true
            ? response()->json(['success' => true])
            : response()->json(['message' => 'unable to reset password', 'success' => false], 400);
    }

    public function verify($id, $hash, Request $request)
    {
        if (!$request->hasValidSignature()) {
            return response()->json(["message" => "invalid verification token", "success" => false], 400);
        }

        $this->userAuthService->verify($id);

        return response()->json([
            'success' => true
        ]);
    }

    public function resend(ResendRequest $request)
    {
        $status = $this->userAuthService->resend($request->email);

        return $status === true
            ? response()->json(['success' => true])
            : response()->json(['message' => 'user must already been verified', 'success' => false], 400);
    }
}
