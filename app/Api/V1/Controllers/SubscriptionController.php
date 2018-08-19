<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Requests\SubscriptionRequest as Request;
use App\Api\V1\Requests\SubscriptionRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriptionResource;
use App\Models\Subscription;
use App\Models\Package;
use App\Models\Cycle;
use Carbon\Carbon;

/**
 * Class SubscriptionController
 * @package App\Api\V1\Controllers
 */
class SubscriptionController extends Controller
{
    /**
     * Pagination per_page.
     *
     * @var integer
     */
    public $per_page = 30;

    /**
     * SubscriptionController constructor.
     * @param Subscription $model
     */
    public function __construct(Subscription $model)
    {
        $this->model = $model;
    }

    /**
     * @return mixed
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index()
    {
        $meta = [];

        $this->authorize('create', Subscription::class);

        $builder = $this->model->orderBy('created_at', 'DESC');

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
     * @param SubscriptionRequest $request
     * @return SubscriptionResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(SubscriptionRequest $request)
    {
        $this->authorize('create', Subscription::class);

        $package = Package::find($request->get('package_id'));
        $cycle = Cycle::find($package->cycle_id);
        $interval = $request->get('interval', 1);

        $model = $this->model->create([
            'package_id' => $request->get('package_id'),
            'user_id' => $request->get('user_id'),
            'service_id' => $package->service_id,
            'cycle_id' => $package->cycle_id,
            'interval' => $interval,
            'expires_at' => Carbon::now()->addDays($cycle->num_days * $interval),
            'suspended_at' => $request->get('suspended_at'),
        ]);

        return new SubscriptionResource($model);
    }

    /**
     * @param $id
     * @return SubscriptionResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
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
     * @param SubscriptionRequest $request
     * @param $id
     * @return SubscriptionResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(Request $request, $id)
    {
        $model = $this->model->findOrFail($id);

        $this->authorize('update', $model);

        $data = $request->only($this->model->getFillable());

        // TODO: Notify user about subscription changes.

        $model->update($data);

        return new SubscriptionResource($model);
    }

    /**
     * @param $id
     * @return SubscriptionResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
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
