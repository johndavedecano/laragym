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
use App\Exceptions\SubscriptionException;

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
        $meta = [];

        $this->authorize('create', User::class);

        $builder = $this->model->orderBy('name', 'ASC');

        if (request()->has('q') && request()->get('q')) {
            $keyword = '%'.request()->get('q').'%';

            $builder = $builder->where('name', 'like', $keyword);
            $builder = $builder->orWhere('account_number', 'like', $keyword);
            $builder = $builder->orWhere('email', 'like', $keyword);
            
            $meta['q'] = request()->get('q');
        }

        $limit = request()->get('per_page', $this->per_page);

        $collection = UserResource::collection(
            $builder->paginate($limit)
        );

        $collection->additional(['meta' => $meta]);

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

        $data = $request->only($this->model->getFillable());

        $model = $this->model->create($data);

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

        $data = $request->only($this->model->getFillable());

        $model->fill($data);

        $model->save();

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

        if ($model->subscriptions()->count() > 0) {
            throw new SubscriptionException('User still has subscription.');
        }

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
