<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class MeController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user()->load('profile', 'branches');

        return response()->json($user);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'contact_number' => 'nullable|string|max:20',
            'address'        => 'nullable|string|max:255',
            'city'           => 'nullable|string|max:100',
            'state'          => 'nullable|string|max:100',
            'country'        => 'nullable|string|max:100',
            'postcode'       => 'nullable|string|max:20',
        ]);

        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return response()->json($user->load('profile', 'branches'));
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password'      => 'required|string',
            'password'              => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|string',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The provided password does not match your current password.'],
            ]);
        }

        $user->update(['password' => Hash::make($request->password)]);

        return response()->json(['message' => 'Password updated successfully.']);
    }

    public function subscriptions(Request $request)
    {
        $results = Subscription::where('user_id', $request->user()->id)
            ->with('package', 'package.cycle', 'package.services')
            ->orderBy('created_at', 'desc')
            ->paginate(request()->get('per_page', 15))
            ->appends(request()->query());

        return response()->json($results);
    }

    public function attendance(Request $request)
    {
        $query = Attendance::where('user_id', $request->user()->id)
            ->with('branch')
            ->orderBy('checked_in_at', 'desc');

        if ($request->has('month')) {
            $query->whereRaw("DATE_FORMAT(checked_in_at, '%Y-%m') = ?", [$request->month]);
        }

        $results = $query->paginate(request()->get('per_page', 15))
            ->appends(request()->query());

        return response()->json($results);
    }
}
