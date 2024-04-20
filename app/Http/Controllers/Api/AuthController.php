<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResendRequest;
use App\Http\Requests\Auth\ResetRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = new User([
            'email' => $request->email,
            'name' => $request->name,
            'password' => bcrypt($request->password)
        ]);

        $user->save();

        event(new Registered($user));

        return response()->json([
            'success' => true
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (!auth()->attempt($credentials)) {
            return response()->json([
                'message' => 'invalid login credentials',
                'success' => false
            ], 401);
        }

        $user = $request->user();
        $token = $user->getPersonalAccessToken();

        return response()->json([
            'success' => true,
            'token_type' => 'Bearer',
            'access_token' => $token,
        ]);
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
        $request->user()->tokens()->delete();

        return response()->json([
            'success' => true
        ]);
    }

    public function forgot(ForgotRequest $request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['success' => true])
            : response()->json(['message' => __($status), 'success' => false], 400);
    }

    public function reset(ResetRequest $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['success' => true, 'message' => [__($status)]])
            : response()->json(['message' => [__($status)], 'success' => false], 400);
    }

    public function verify($id, $hash, Request $request)
    {
        if (!$request->hasValidSignature()) {
            return response()->json(["message" => "invalid verification token", "success" => false], 400);
        }

        $user = User::findOrFail($id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        return response()->json([
            'success' => true
        ]);
    }

    public function resend(ResendRequest $request)
    {
        $user = User::where('email', '=', $request->email)->firstOrFail();

        if ($user->hasVerifiedEmail()) {
            return response()->json(["message" => "email is already verified.", "success" => false], 400);
        }

        $user->sendEmailVerificationNotification();

        return response()->json([
            'success' => true
        ]);
    }
}
