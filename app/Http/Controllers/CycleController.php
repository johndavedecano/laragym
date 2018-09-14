<?php

namespace App\Http\Controllers;

use App\Models\Cycle;
use App\Http\Resources\CycleResource;
use App\Http\Requests\CommonRequest as Request;
use App\Exceptions\DefaultEntityException;
use App\Exceptions\SubscriptionException;
use App\Services\Activity\ActivityService;
use App\Services\Cycle\CycleCollection;
use App\Services\Cycle\CycleService;

class CycleController extends Controller
{
    /**
     * @var CycleCollection
     */
    protected $collection;

    /**
     * @var CycleService
     */
    protected $cycle;

    /**
     * CycleController constructor.
     * @param CycleService $cycle
     */
    public function __construct(CycleService $cycle)
    {
        $this->cycle = $cycle;
    }

    /**
     * @param CycleCollection $cycles
     * @return mixed
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function index(CycleCollection $cycles)
    {
        $this->authorize('create', Cycle::class);

        $collection = CycleResource::collection($cycles->get());

        $collection->additional(['meta' => $cycles->meta]);

        return $collection;
    }

    /**
     * @param Request $request
     * @return CycleResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(Request $request)
    {
        $this->authorize('create', Cycle::class);

        $model = $this->cycle->create($request->all());

        ActivityService::log($model->id, "Billing cycle #$model->id was created.");

        return new CycleResource($model);
    }

    /**
     * @param $id
     * @return CycleResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id)
    {
        $model = $this->cycle->find($id);

        $this->authorize('view', $model);

        return new CycleResource($model);
    }

    /**
     * @param Request $request
     * @param $id
     * @return CycleResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update(Request $request, $id)
    {
        $model = $this->cycle->find($id);

        $this->validate($request, [
            'num_days' => 'numeric',
        ]);

        $this->authorize('update', $model);

        $model = $this->cycle->update($model, $request->all());

        ActivityService::log($model->id, "Billing cycle #$model->id was updated.");

        return new CycleResource($model);
    }

    /**
     * @param $id
     * @return CycleResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function destroy($id)
    {
        $model = $this->cycle->find($id);

        $this->authorize('delete', $model);

        $this->cycle->delete($model);

        ActivityService::log($model->id, "Billing cycle #$model->id was deleted.");

        return new CycleResource($model);
    }
}
