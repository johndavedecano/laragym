<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Http\Resources\ActivityResource;
use App\Http\Requests\CommonRequest as Request;

/**
 * Class ActivityController
 * @package App\Http\Controllers
 */
class ActivityController extends Controller
{
    /**
     * ActivityController constructor.
     * @param Activity $model
     */
    public function __construct(Activity $model)
    {
        $this->model = $model;
    }

    /**
     * @return mixed
     */
    public function index()
    {
        $user = auth()->guard()->user();

        if ($user->is_admin) {
            return ActivityResource::collection($this->model->all());
        }

        return ActivityResource::collection(
            $this->model->where('user_id', $user->id)->paginate()
        );
    }

    /**
     * @param Request $request
     * @return ActivityResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(Request $request)
    {
        $this->authorize('create', Activity::class);

        $model = $this->model->create([
            'name' => $request->get('name')
        ]);

        return new ActivityResource($model);
    }

    /**
     * @param $id
     * @return ActivityResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id)
    {
        $model = $this->model->findOrFail($id);

        $this->authorize('view', $model);

        return new ActivityResource($model);
    }

    /**
     * @param Request $request
     * @param $id
     * @return ActivityResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(Request $request, $id)
    {
        $model = $this->model->findOrFail($id);

        $this->authorize('update', $model);

        $model->update([
            'name' => $request->get('name')
        ]);

        return new ActivityResource($model);
    }

    /**
     * @param $id
     * @return ActivityResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy($id)
    {
        $model = $this->model->findOrFail($id);

        $this->authorize('delete', $model);

        $model->delete();

        return new ActivityResource($model);
    }
}
