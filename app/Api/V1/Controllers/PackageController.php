<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Http\Resources\PackageResource;
use App\Api\V1\Requests\PackageRequest as Request;
use App\Exceptions\SubscriptionException;

class PackageController extends Controller
{
    /**
     * Pagination per_page.
     *
     * @var integer
     */
    public $per_page = 30;

    /**
     * @param Package $model
     */
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
        $this->authorize('create', Package::class);

        $builder = $this->model->orderBy('name', 'ASC');

        if (request()->has('q') && request()->get('q')) {
            $keyword = '%'.request()->get('q').'%';
            $builder = $builder->where('name', 'like', $keyword);
        }

        $builder = $builder->with('cycle');
        
        $builder = $builder->with('service');

        $limit = request()->get('per_page', $this->per_page);

        $collection = PackageResource::collection(
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
        $this->authorize('create', Package::class);

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
        $model = $this->model->findOrFail($id);

        $this->authorize('view', $model);

        return new PackageResource($model);
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

        $this->authorize('delete', $model);

        if ($model->subscriptions()->count() > 0) {
            throw new SubscriptionException('You cannot delete an entity that has existing subscriptions.');
        }

        $model->delete();

        return new PackageResource($model);
    }
}
