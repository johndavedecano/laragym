<?php

namespace App\Services;

use App\Exceptions\ErrorType;
use App\Exceptions\UserAuthException;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserAuthService
{
    public function register(string $email, string $password, string $name)
    {
        $user = new User([
            'email' => $email,
            'name' => $name,
            'password' => bcrypt($password)
        ]);

        $user->save();

        event(new Registered($user));
    }

    public function login(string $email, string $password): string
    {
        $credentials = ['email' => $email, 'password' => $password];

        if (!auth()->attempt($credentials)) {
            throw new UserAuthException(ErrorType::INVALID_CREDENTIALS);
        }

        $user = User::where('email', $email)->firstOrFail();

        return $user->getPersonalAccessToken();
    }

    public function logout(User $user)
    {
        return $user->tokens()->delete();
    }

    public function forgot(string $email)
    {
        $status = Password::sendResetLink(
            ['email' => $email]
        );

        return $status === Password::RESET_LINK_SENT;
    }

    public function reset(array $arr = [])
    {
        $status = Password::reset(
            \Arr::only($arr, ['email', 'password', 'password_confirmation', 'token']),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET;
    }

    public function verify($id)
    {
        $user = User::findOrFail($id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }
    }

    public function resend(string $email)
    {
        $user = User::where('email', '=', $email)->firstOrFail();

        if ($user->hasVerifiedEmail()) {
            return false;
        }

        $user->sendEmailVerificationNotification();

        return true;
    }
}
