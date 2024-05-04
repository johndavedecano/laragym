<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Models\Package;
use Spatie\QueryBuilder\AllowedFilter;
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
            ->allowedFilters(
                AllowedFilter::partial('name'),
                AllowedFilter::exact('status')
            )
            ->with('cycle')
            ->with('services')
            ->paginate(request()->get('per_page', 15))
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
        $package = Package::create($request->only([
            'name',
            'amount',
            'status',
            'cycle_id',
        ]));

        $package->services()->attach($request->services);

        $package->load('services');

        return response()->json($package);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Package $package
     * @return \Illuminate\Http\Response
     */
    public function show(Package $package)
    {
        $package->load('services')->load('cycle');

        return response()->json($package);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePackageRequest  $request
     * @param  \App\Models\Package $package
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePackageRequest $request, Package $package)
    {
        $result = $package->update($request->only([
            'name',
            'amount',
            'status',
            'cycle_id',
        ]));

        if ($request->has('services')) {
            $package->services()->sync($request->services);
        }

        $package->load('services');

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Http\Response
     */
    public function destroy(Package $package)
    {
        $package->delete();

        return response()->json(null, 204);
    }
}
