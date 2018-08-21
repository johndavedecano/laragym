<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Http\Resources\ServiceResource;
use App\Api\V1\Requests\CommonRequest as Request;
use App\Exceptions\DefaultEntityException;
use App\Exceptions\SubscriptionException;
use App\Services\Service\ServiceCollection;
use App\Services\Service\ServiceLogic;

class ServiceController extends Controller
{
    /**
     * @param ServiceCollection $services
     * @return mixed
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(ServiceCollection $services)
    {
        $this->authorize('create', Service::class);

        $collection = ServiceResource::collection($services->get());

        $collection->additional(['meta' => $services->meta]);

        return $collection;
    }

    /**
     * @param Request $request
     * @param ServiceLogic $service
     * @return ServiceResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(Request $request, ServiceLogic $service)
    {
        $this->authorize('create', Service::class);

        $model = $service->create([
            'name' => $request->get('name'),
            'description' => $request->get('description'),
            'is_archived' => $request->get('is_archived', false)
        ]);

        return new ServiceResource($model);
    }

    /**
     * @param $id
     * @param ServiceLogic $service
     * @return ServiceResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id, ServiceLogic $service)
    {
        $model = $service->find($id);

        $this->authorize('view', $model);

        return new ServiceResource($model);
    }

    /**
     * @param Request $request
     * @param ServiceLogic $service
     * @param $id
     * @return ServiceResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(Request $request, ServiceLogic $service, $id)
    {
        $model = $service->find($id);

        $this->authorize('update', $model);

        $service->update($model, [
            'name' => $request->get('name'),
            'description' => $request->get('description'),
            'is_archived' => $request->get('is_archived', false)
        ]);

        return new ServiceResource($model);
    }

    /**
     * @param ServiceLogic $service
     * @param $id
     * @return ServiceResource
     * @throws DefaultEntityException
     * @throws SubscriptionException
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy(ServiceLogic $service, $id)
    {
        $model = $service->find($id);

        $this->authorize('delete', $model);

        $service->delete($model);

        return new ServiceResource($model);
    }
}
