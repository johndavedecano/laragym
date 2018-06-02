<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Requests\SubscriptionRequest as Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriptionResource;
use App\Models\Subscription;

class SubscriptionController extends Controller
{
    public function __construct(Subscription $model)
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
        $meta = [];

        $this->authorize('create', Subscription::class);

        $builder = $this->model->orderBy('name', 'ASC');

        if (request()->has('user_id') && request()->get('user_id')) {
            $meta['user_id'] = request()->get('user_id');
            $builder = $builder->where('user_id', request()->get('user_id'));
        }

        if (request()->has('package_id') && request()->get('package_id')) {
            $meta['package_id'] = request()->get('package_id');
            $builder = $builder->where('package_id', request()->get('package_id'));
        }

        if (request()->has('cycle_id') && request()->get('cycle_id')) {
            $meta['cycle_id'] = request()->get('cycle_id');
            $builder = $builder->where('cycle_id', request()->get('cycle_id'));
        }

        if (request()->has('service_id') && request()->get('service_id')) {
            $meta['service_id'] = request()->get('service_id');
            $builder = $builder->where('service_id', request()->get('service_id'));
        }

        if (request()->has('is_suspended') && request()->get('is_suspended')) {
            $meta['is_suspended'] = request()->get('is_suspended');
            $builder = $builder->where('is_suspended', request()->get('is_suspended'));
        }

        if (request()->has('is_expired') && request()->get('is_expired')) {
            $meta['is_expired'] = request()->get('is_expired');
            $builder = $builder->where('is_expired', request()->get('is_expired'));
        }

        $limit = request()->get('per_page', $this->per_page);

        $collection = SubscriptionResource::collection(
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
        $this->authorize('create', Subscription::class);

        $model = $this->model->create([
            'package_id'   => $request->get('package_id'),
            'user_id'      => $request->get('user_id'),
            'service_id'   => $request->get('service_id'),
            'cycle_id'     => $request->get('cycle_id'),
            'interval'     => $request->get('interval', 1),
            'expires_at'   => $request->get('expires_at'),
            'suspended_at' => $request->get('suspended_at'),
        ]);

        return new SubscriptionResource($model);
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

        $model->load('package');

        $model->load('user');

        $model->load('cycle');
        
        $model->load('service');

        $this->authorize('view', $model);

        return new SubscriptionResource($model);
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
            'package_id'   => $request->get('package_id'),
            'user_id'      => $request->get('user_id'),
            'service_id'   => $request->get('service_id'),
            'cycle_id'     => $request->get('cycle_id'),
            'interval'     => $request->get('interval', 1),
            'expires_at'   => $request->get('expires_at'),
            'suspended_at' => $request->get('suspended_at'),
        ]);

        return new SubscriptionResource($model);
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

        $model->is_archived = true;

        $model->save();

        return new SubscriptionResource($model);
    }
}
