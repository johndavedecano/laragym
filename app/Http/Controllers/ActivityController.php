<?php

namespace App\Http\Controllers;

use App\Constants;
use App\Http\Resources\ActivityResource;
use App\Services\Activity\ActivityCollection;
use App\Services\Activity\ActivityService;
use Illuminate\Http\Request;

/**
 * Class ActivityController
 * @package App\Http\Controllers
 */
class ActivityController extends Controller
{
    /**
     * @var ActivityCollection
     */
    protected $collection;

    /**
     * @var ActivityService
     */
    protected $service;

    /**
     * ActivityController constructor.
     * @param ActivityCollection $collection
     * @param ActivityService $service
     */
    public function __construct(ActivityCollection $collection, ActivityService $service)
    {
        $this->collection = $collection;

        $this->service = $service;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $request = $request->all();

        $request['type'] = Constants::ACTIVITY_SYSTEM;

        $response = $this->collection->list($request);

        $collection = ActivityResource::collection($response);

        $collection->additional(['meta' => $this->collection->meta]);

        return $collection;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function attendanceIndex(Request $request)
    {
        $request = $request->all();

        $request['type'] = Constants::ACTIVITY_ATTENDANCE;

        $response = $this->collection->list($request);

        $collection = ActivityResource::collection($response);

        $collection->additional(['meta' => $this->collection->meta]);

        return $collection;
    }

    /**
     * @param Request $request
     * @return ActivityResource
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id'     => 'required|exists:users,id',
            'description' => 'required|in:login,logout'
        ]);

        $response = $this->service->attend($request['user_id'], $request['description']);

        return new ActivityResource($response);
    }

    /**
     * @param $id
     * @return ActivityResource
     */
    public function show($id)
    {
        $response = $this->service->find($id);

        return new ActivityResource($response);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $activity = $this->service->find($id);

        $response = $this->service->delete($activity);

        return response()->json($response);
    }
}
