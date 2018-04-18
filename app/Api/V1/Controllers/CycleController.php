<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cycle;
use App\Http\Resources\CycleResource;
use App\Api\V1\Requests\CommonRequest as Request;

class CycleController extends Controller
{
    public function __construct(Cycle $model)
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
        return CycleResource::collection($this->model->all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $model = $this->model->create([
            'name' => $request->get('name'),
            'description' => $request->get('description'), 
            'is_archived' => $request->get('is_archived', false)
        ]);

        return new CycleResource($model);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new CycleResource($this->model->findOrFail($id));
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

        $model->update([
            'name' => $request->get('name'),
            'description' => $request->get('description'), 
            'is_archived' => $request->get('is_archived', false)
        ]);

        return new CycleResource($model);
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

        $model->delete();

        return new CycleResource($model);
    }
}
