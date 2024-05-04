<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $results = QueryBuilder::for(Service::class)
            ->allowedFilters(
                AllowedFilter::partial('name'),
                AllowedFilter::exact('status')
            )
            ->paginate(request()->get('per_page', 15))
            ->appends(request()->query());

        return response()->json($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreServiceRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreServiceRequest $request)
    {
        $result = Service::create($request->only([
            'name',
            'status',
            'description',
        ]));

        return response()->json($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        return response()->json($service);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateServiceRequest $request
     * @param  \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        $result = $service->update($request->only([
            'name',
            'status',
            'description',
        ]));

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Service $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json(null, 204);
    }
}
