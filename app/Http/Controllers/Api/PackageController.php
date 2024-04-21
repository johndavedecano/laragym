<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Models\Package;
use Spatie\QueryBuilder\QueryBuilder;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $results = QueryBuilder::for(Package::class)
            ->paginate()
            ->appends(request()->query());

        return response()->json($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePackageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePackageRequest $request)
    {
        $result = Package::create($request->only([
            'name',
            'num_days',
            'status',
            'description',
        ]));

        return response()->json($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Package  $cycle
     * @return \Illuminate\Http\Response
     */
    public function show(Package $cycle)
    {
        return response()->json($cycle);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePackageRequest  $request
     * @param  \App\Models\Package  $cycle
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePackageRequest $request, Package $cycle)
    {
        $result = $cycle->update($request->only([
            'name',
            'num_days',
            'status',
            'description',
        ]));

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Package  $cycle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Package $cycle)
    {
        $result = $cycle->delete();

        return response()->json($result);
    }
}
