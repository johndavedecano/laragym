<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCycleRequest;
use App\Http\Requests\UpdateCycleRequest;
use App\Models\Cycle;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CycleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $results = QueryBuilder::for(Cycle::class)
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
     * @param  \App\Http\Requests\StoreCycleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCycleRequest $request)
    {
        $result = Cycle::create($request->only([
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
     * @param  \App\Models\Cycle  $cycle
     * @return \Illuminate\Http\Response
     */
    public function show(Cycle $cycle)
    {
        return response()->json($cycle);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCycleRequest  $request
     * @param  \App\Models\Cycle  $cycle
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCycleRequest $request, Cycle $cycle)
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
     * @param  \App\Models\Cycle  $cycle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cycle $cycle)
    {
        $cycle->delete();

        return response()->json(null, 204);
    }
}
