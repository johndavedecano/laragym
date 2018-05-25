<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Requests\UserRequest as Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Auth;
use Hash;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;

class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(User $model)
    {
        $this->middleware('auth:api', []);

        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('create', User::class);

        return UserResource::collection(
            $this->model->orderBy('name', 'DESC')->paginate()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);

        $model = $this->model->create([
            'name' => $request->get('name', ''),
            'email' => $request->get('email', ''),
            'password'=> Hash::make($request->get('password', '')),
            'account_number' => $request->get('account_number', date('YmdHis')),
            'mobile' => $request->get('mobile', ''),
            'avatar' => $request->get('avatar', ''),
            'date_of_birth' => $request->get('date_of_birth', ''),
            'address' => $request->get('address', ''),
            'city' => $request->get('city', ''),
            'state' => $request->get('state', ''),
            'postal_code' => $request->get('postal_code', '')
        ]);

        return new UserResource($model);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $model = $this->model->findOrFail($id);

        $this->authorize('view', $model);

        return new UserResource($model);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $model = $this->model->findOrFail($id);

        $this->authorize('update', $model);

        $model->update([
            'name' => $request->get('name', ''),
            'email' => $request->get('email', ''),
            'password'=> $request->get('password', ''),
            'account_number' => $request->get('account_number', date('YmdHis')),
            'mobile' => $request->get('mobile', ''),
            'avatar' => $request->get('avatar', ''),
            'date_of_birth' => $request->get('date_of_birth', ''),
            'address' => $request->get('address', ''),
            'city' => $request->get('city', ''),
            'state' => $request->get('state', ''),
            'postal_code' => $request->get('postal_code', '')
        ]);

        if ($request->has('password')) {
            $model->update([
                'password' => Hash::make($request->get('password'))
            ]);
        }

        return new UserResource($model);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = $this->model->findOrFail($id);

        $this->authorize('delete', $model);

        $model->delete();

        return new UserResource($model);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(Auth::guard()->user());
    }
}
