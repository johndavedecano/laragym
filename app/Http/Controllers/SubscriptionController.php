<?php

namespace App\Http\Controllers;

use App\Constants;
use App\Http\Requests\SubscriptionRequest as Request;
use App\Http\Resources\SubscriptionResource;
use App\Models\Subscription;
use App\Services\Activity\ActivityService;
use App\Services\Subscription\SubscriptionCollection;
use App\Services\Subscription\SubscriptionService;

/**
 * Class SubscriptionController
 * @package App\Http\Controllers
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
     * @param Request $request
     * @param SubscriptionService $subscriptionService
     * @return SubscriptionResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(Request $request, SubscriptionService $subscriptionService)
    {
        $this->authorize('create', Subscription::class);

        $subscription = $subscriptionService->create($request->all());

        ActivityService::log($subscription->id, "Subscription #$subscription->id was created.");

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
        $model = $service->find($id);

        $this->authorize('view', $model);

        $model->load('package');
        $model->load('user');
        $model->load('cycle');
        $model->load('service');

        return new SubscriptionResource($model);
    }

    /**
     * @param Request $request
     * @param SubscriptionService $subscriptionService
     * @param $id
     * @return SubscriptionResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(Request $request, SubscriptionService $subscriptionService, $id)
    {
        $model = $subscriptionService->find($id);

        $this->authorize('update', $model);

        $data = $request->only($model->getFillable());

        $model->update($data);

        ActivityService::log($model->id, "Subscription #$model->id was updated.");

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

        ActivityService::log($model->id, "Subscription #$model->id was deleted.");

        return new SubscriptionResource($model);
    }
}
