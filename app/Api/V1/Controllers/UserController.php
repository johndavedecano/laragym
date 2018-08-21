<?php

namespace App\Api\V1\Controllers;

use App\Services\User\UserCollection;
use App\Services\User\UserService;
use App\Api\V1\Requests\UserRequest as Request;
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
     * @param UserCollection $list
     * @return mixed
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(UserCollection $list)
    {
        $meta = [];

        $this->authorize('create', User::class);

        if (request()->has('q') && request()->get('q')) {
            $meta['q'] = request()->get('q');
        }

        $collection = UserResource::collection($list->get());

        $collection->additional(['meta' => $meta]);

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
            'email' => 'required',
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

        $this->authorize('update', $user);

        $user = $this->userService->update($user, $request->all());

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
