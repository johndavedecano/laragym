<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserAuthService;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserController extends Controller
{
    private UserAuthService $userAuthService;

    public function __construct()
    {
        $this->userAuthService = new UserAuthService();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $results = QueryBuilder::for(User::class)
            ->allowedFilters([
                AllowedFilter::partial('name'),
                AllowedFilter::partial('email')
            ])
            ->paginate(request()->get('per_page', 15))
            ->appends(request()->query());

        return response()->json($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $this->userAuthService->register($request->email, $request->password, $request->name);

        return response()->json(['success' => true], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $user->load('profile');

        $user->load('branches');

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        if ($request->has('email') && $user->email != $request->email) {
            $exists = User::where('email', '=', $request->email)->exists();
            if ($exists) {
                return response()->json(['message' => 'email must be unique'], 400);
            }
            $user->email = $request->email;
        }

        if ($request->has('password')) {
            $user->password = bcrypt($request->password);
        }

        if ($request->has('name')) {
            $user->name = $request->name;
        }

        $profile = [
            'contact_number',
            'address',
            'city',
            'state',
            'country',
            'postcode',
            'newsletter'
        ];

        if (
            $request->hasAny($profile)
        ) {
            $user->profile()->update($request->only([
                'contact_number',
                'address',
                'city',
                'state',
                'country',
                'postcode',
                'newsletter'
            ]));
        }

        $user->save();

        $user->refresh();

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if ($user->is_admin) {
            return response()->json(['message' => 'you are not allowed to do this to yourself'], 401);
        }

        $user->delete();

        return response()->json(null, 204);
    }
}
