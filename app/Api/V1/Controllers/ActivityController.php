<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Http\Resources\ActivityResource;
use App\Api\V1\Requests\CommonRequest as Request;

class ActivityController extends Controller
{
    public function __construct(Activity $model)
    {
        $this->model = $model;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $model = $this->model->findOrFail($id);

        $this->authorize('view', $model);

        return new ActivityResource($model);
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
            'name' => $request->get('name')
        ]);

        return new ActivityResource($model);
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

        return new ActivityResource($model);
    }
}
