<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Illuminate\Http\Request;

class UserAvatarController extends Controller
{
    public function store(Request $request, User $user)
    {
        $request->validate([
            'avatar' => 'required|file|mimes:jpeg,png,jpg|max:10000'
        ]);

        $manager = new ImageManager(['driver' => 'gd']);

        $img = $manager->make($request->file('avatar'));

        if ($img->height() > $img->width()) {
            $img->resize(100, null, function ($constraint) {
                $constraint->aspectRatio();
            });
        } else {
            $img->resize(null, 100, function ($constraint) {
                $constraint->aspectRatio();
            });
        }

        $file = $request->file('avatar')->hashName();

        Storage::put('public/' . $file, $img->encode());

        $url = Storage::url($file);

        $user->avatar = $url;

        $user->save();

        return response()->json(['message' => 'successfully uploaded', 'path' => $url]);
    }
}
