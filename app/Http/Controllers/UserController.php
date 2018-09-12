<?php

namespace App\Http\Controllers;

use App\Services\User\UserCollection;
use App\Services\User\UserService;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Exceptions\SubscriptionException;

class UserController extends Controller
{
    /**
     * @var UserService
     */
    protected $userService;

    /**
     * UserController constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->middleware('auth:api', []);

        $this->userService = $userService;
    }

    /**
     * @param UserCollection $users
     * @return mixed
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(UserCollection $users)
    {
        $this->authorize('create', User::class);

        $collection = UserResource::collection($users->get());

        $collection->additional(['meta' => $users->meta]);

        return $collection;
    }

    /**
     * @param Request $request
     * @return UserResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);

        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:6|max:12|confirmed'
        ]);

        $model = $this->userService->create($request->all());

        return new UserResource($model);
    }


    /**
     * @param $id
     * @return UserResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id)
    {
        $user = $this->userService->find($id);

        $this->authorize('view', $user);

        return new UserResource($user);
    }

    /**
     * @param Request $request
     * @param $id
     * @return UserResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(Request $request, $id)
    {
        $user = $this->userService->find($id);

        $rules = [];

        $this->authorize('update', $user);

        if ($request->has('password')) {
            $rules['password'] = 'min:8|max:12|confirmed';
        }

        if ($request->has('email') && $user->email !== $request->get('email')) {
            $rules['email'] = 'email|unique:users,email';
        }

        $request = $request->all();

        $user = $this->userService->update($user, $request);

        return new UserResource($user);
    }

    /**
     * @param $id
     * @return UserResource
     * @throws SubscriptionException
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy($id)
    {
        $user = $this->userService->find($id);

        $this->authorize('delete', $user);

        $user = $this->userService->delete($user);

        return new UserResource($user);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->userService->getCurrentUser());
    }
}
