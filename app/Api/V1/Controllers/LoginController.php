<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Auth;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;

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
