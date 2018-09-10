<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Auth;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;

class RefreshController extends Controller
{
    public function __construct()
    {
        $this->middleware(['jwt.refresh']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $token = Auth::guard()->refresh();

        return response()->json([
            'status' => 'ok',
            'token' => $token,
            'expires_in' => Auth::guard()->factory()->getTTL() * 60
        ]);
    }
}
