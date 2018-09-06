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
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index()
    {
        $meta = [];
        
        $this->authorize('create', Package::class);

        $builder = $this->model->orderBy('name', 'ASC');

        $builder = $builder->with('cycle')->with('service');

        if (request()->has('q') && request()->get('q')) {
            $keyword = '%'.request()->get('q').'%';
            $builder = $builder->where('name', 'like', $keyword);
            $meta['q'] = request()->get('q');
        }

        if (request()->has('is_archived')) {
            $builder = $builder->where('is_archived', request()->get('is_archived'));
            $meta['is_archived'] = request()->get('is_archived');
        }

        $limit = request()->get('per_page', $this->per_page);

        $collection = PackageResource::collection(
            $builder->paginate($limit)
        );

        $collection->additional(['meta' => $meta]);

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
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id)
    {
        $model = $this->model->findOrFail($id);

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
     * @param $id
     * @return PackageResource
     * @throws SubscriptionException
     * @throws \Illuminate\Auth\Access\AuthorizationException
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
