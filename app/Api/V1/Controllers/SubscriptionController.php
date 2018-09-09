<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Requests\SubscriptionRequest as Request;
use App\Api\V1\Requests\SubscriptionRequest;
use App\Constants;
use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriptionResource;
use App\Models\Subscription;
use App\Models\Package;
use App\Models\Cycle;
use App\Services\Subscription\SubscriptionCollection;
use App\Services\Subscription\SubscriptionService;
use Carbon\Carbon;

/**
 * Class SubscriptionController
 * @package App\Api\V1\Controllers
 */
class SubscriptionController extends Controller
{
    /**
     * @param SubscriptionCollection $subscriptions
     * @return mixed
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(SubscriptionCollection $subscriptions)
    {
        $this->authorize('create', Subscription::class);

        $collection = SubscriptionResource::collection($subscriptions->get());

        $collection->additional(['meta' => $subscriptions->getMeta()]);

        return $collection;
    }

    /**
     * @param SubscriptionRequest $request
     * @param SubscriptionService $subscriptionService
     * @return SubscriptionResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(SubscriptionRequest $request, SubscriptionService $subscriptionService)
    {
        $this->authorize('create', Subscription::class);

        $subscription = $subscriptionService->create($request->all());

        return new SubscriptionResource($subscription);
    }

    /**
     * @param SubscriptionService $service
     * @param $id
     * @return SubscriptionResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show(SubscriptionService $service, $id)
    {
        $model = $service->findOrFail($id);

        $this->authorize('view', $model);

        $model->load('package');
        $model->load('user');
        $model->load('cycle');
        $model->load('service');

        return new SubscriptionResource($model);
    }

    /**
     * @param SubscriptionRequest $request
     * @param SubscriptionService $subscriptionService
     * @param $id
     * @return SubscriptionResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(Request $request, SubscriptionService $subscriptionService, $id)
    {
        $model = $subscriptionService->find($id);

        $this->validate($request, [
            'package_id'   => 'exists:packages,id',
            'user_id'      => 'exists:users,id',
            'interval'     => 'numeric|min:1',
            'suspended_at' => 'date_format:Y-m-d',
            'status'       => 'in:active,inactive,deleted,expired,suspended'
        ]);

        $this->authorize('update', $model);

        $data = $request->only($model->getFillable());

        $model->update($data);

        return new SubscriptionResource($model);
    }

    /**
     * @param SubscriptionService $subscriptionService
     * @param $id
     * @return SubscriptionResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy(SubscriptionService $subscriptionService, $id)
    {
        $model = $subscriptionService->find($id);

        $this->authorize('delete', $model);

        $model->status = Constants::STATUS_DELETED;

        $model->save();

        return new SubscriptionResource($model);
    }
}
