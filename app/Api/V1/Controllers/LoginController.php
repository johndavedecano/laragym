<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use App\Api\V1\Requests\LoginRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;

class LoginController extends Controller
{
    /**
     * Log the user in
     *
     * @param LoginRequest $request
     * @param JWTAuth $JWTAuth
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request, JWTAuth $JWTAuth)
    {
        $credentials = [
            'email' => $request->get('email'),
            'password' => $request->get('password'),
            'is_active' => 1,
        ];

        try {
            $token = Auth::guard()->attempt($credentials);

            if (!$token) {
                throw new AccessDeniedHttpException('Invalid username or password.');
            }
        } catch (JWTException $e) {
            throw new HttpException(500);
        }

        $user = Auth::guard()->user();
        $user->logLastLogin();

        return response()
            ->json([
                'status' => 'ok',
                'token' => $token,
                'expires_in' => Auth::guard()->factory()->getTTL() * 60
            ]);
    }
}
