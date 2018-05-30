<?php

namespace App\Api\V1\Controllers;

use Auth;
use Hash;

use App\Api\V1\Requests\UserRequest as Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;

class UserController extends Controller
{
    /**
     * Pagination per_page.
     *
     * @var integer
     */
    public $per_page = 30;
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

        $builder = $this->model->orderBy('name', 'ASC');

        if (request()->has('q') && request()->get('q')) {
            $keyword = '%'.request()->get('q').'%';
            $builder = $builder->where('name', 'like', $keyword);
            $builder = $builder->orWhere('account_number', 'like', $keyword);
            $builder = $builder->orWhere('email', 'like', $keyword);
        }

        $limit = request()->get('per_page', $this->per_page);

        $collection = UserResource::collection(
            $builder->paginate($limit)
        );

        if (request()->has('q') && request()->get('q')) {
            $collection->additional(['meta' => [
                'q' => request()->get('q'),
            ]]);
        }

        return $collection;
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
            'password'=> $request->get('password', 'password1234567890'),
            'mobile' => $request->get('mobile', ''),
            'avatar' => $request->get('avatar', ''),
            'address' => $request->get('address', ''),
            'city' => $request->get('city', ''),
            'state' => $request->get('state', ''),
            'postal_code' => $request->get('postal_code', ''),
            'is_admin' => $request->get('is_admin', false),
            'account_number' => date('YmdHis'),
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

        $data = [];

        if ($request->has('name')) {
            $data['name'] = $request->get('name', '');
        }

        if ($request->has('mobile')) {
            $data['mobile'] = $request->get('mobile', '');
        }

        if ($request->has('avatar')) {
            $data['avatar'] = $request->get('avatar', '');
        }

        if ($request->has('date_of_birth')) {
            $data['date_of_birth'] = $request->get('date_of_birth', date('Y-m-d'));
        }

        if ($request->has('address')) {
            $data['address'] = $request->get('address', '');
        }

        if ($request->has('city')) {
            $data['city'] = $request->get('city', '');
        }

        if ($request->has('state')) {
            $data['state'] = $request->get('state', '');
        }

        if ($request->has('postal_code')) {
            $data['postal_code'] = $request->get('postal_code', '');
        }
        
        if ($request->has('is_admin')) {
            $data['is_admin'] = $request->get('is_admin', false);
        }

        if ($request->has('password')) {
            $data['password'] = $request->get('password', 'password1234567890');
        }

        if ($request->has('email')) {
            $data['email'] = $request->get('email');
        }

        $model->update($data);

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
