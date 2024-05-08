<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserAvatarRequest;
use App\Models\User;

class UserAvatarController extends Controller
{
    public function store(UserAvatarRequest $request, User $user)
    {
        $path = $request->file('avatar')->storePubliclyAs(
            'avatars',
            $user->id
        );

        $user->avatar = $path;

        $user->save();

        $user->refresh();

        return response()->json($user);
    }
}
