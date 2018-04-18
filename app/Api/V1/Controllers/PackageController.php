<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Http\Resources\PackageResource;
use App\Api\V1\Requests\PackageRequest as Request;

class PackageController extends Controller
{
    public function __construct(Package $model)
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
        return PackageResource::collection($this->model->paginate());
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
            'amount'      => $request->get('amount'),
            'cycle_id'    => $request->get('cycle_id'),
            'is_archived' => $request->get('is_archived', false),
            'name'        => $request->get('name'),
            'service_id'  => $request->get('service_id'),
        ]);

        return new PackageResource($model);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new PackageResource($this->model->findOrFail($id));
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
            'amount'      => $request->get('amount'),
            'cycle_id'    => $request->get('cycle_id'),
            'is_archived' => $request->get('is_archived', false),
            'name'        => $request->get('name'),
            'service_id'  => $request->get('service_id'),
        ]);

        return new PackageResource($model);
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

        return new PackageResource($model);
    }
}
