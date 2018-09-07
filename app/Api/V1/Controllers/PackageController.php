<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Http\Resources\PackageResource;
use App\Api\V1\Requests\PackageRequest as Request;
use App\Exceptions\SubscriptionException;
use App\Services\Package\PackageCollection;
use App\Services\Package\PackageService;

class PackageController extends Controller
{
    /**
     * Pagination per_page.
     *
     * @var integer
     */
    public $per_page = 30;

    /**
     * @var PackageService
     */
    protected $service;

    /**
     * PackageController constructor.
     * @param PackageService $service
     */
    public function __construct(PackageService $service)
    {
        $this->service = $service;
    }

    /**
     * @param PackageCollection $packages
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(PackageCollection $packages)
    {
        $this->authorize('create', Package::class);

        $collection = PackageResource::collection($packages->get());

        $collection->additional(['meta' => $packages->meta]);

        return $collection;
    }

    /**
     * @param Request $request
     * @return PackageResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(Request $request)
    {
        $this->authorize('create', Package::class);

        $this->validate($request->all(), [
            'amount'      => 'required|numeric',
            'cycle_id'    => 'required|exists:cycles,id',
            'name'        => 'required|max:126',
            'service_id'  => 'required|exists:services,id',
        ]);

        $model = $this->service->create([
            'amount'      => $request->get('amount'),
            'cycle_id'    => $request->get('cycle_id'),
            'is_archived' => $request->get('is_archived', false),
            'name'        => $request->get('name'),
            'service_id'  => $request->get('service_id'),
        ]);

        return new PackageResource($model);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id)
    {
        $model = $this->service->find($id);

        $model->load('service');

        $model->load('cycle');

        $this->authorize('view', $model);

        return response()->json([
            'data' => array_merge($model->toArray(), [
                'subscriptions_count' => $model->subscriptions->count(),
            ])
        ]);
    }


    /**
     * @param Request $request
     * @param $id
     * @return PackageResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(Request $request, $id)
    {
        $model = $this->service->find($id);

        $this->authorize('update', $model);

        $this->validate($request->all(), [
            'amount'      => 'numeric',
            'cycle_id'    => 'exists:cycles,id',
            'name'        => 'max:126',
            'service_id'  => 'exists:services,id',
        ]);

        $this->service->update($model, $request->all());

        return new PackageResource($model);
    }

    /**
     * @param $id
     * @return PackageResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy($id)
    {
        $model = $this->service->find($id);

        $this->authorize('delete', $model);

        $this->service->destroy($model);

        return new PackageResource($model);
    }
}
