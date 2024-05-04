<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use App\Models\Branch;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $results = QueryBuilder::for(Branch::class)
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
     * @param  \App\Http\Requests\StoreBranchRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBranchRequest $request)
    {
        $result = Branch::create($request->only([
            'name',
            'status',
            'description',
        ]));

        return response()->json($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Branch $branch
     * @return \Illuminate\Http\Response
     */
    public function show(Branch $branch)
    {
        return response()->json($branch);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBranchRequest $request
     * @param  \App\Models\Branch $branch
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $result = $branch->update($request->only([
            'name',
            'status',
            'description',
        ]));

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Branch $branch
     * @return \Illuminate\Http\Response
     */
    public function destroy(Branch $branch)
    {
        $branch->delete();

        return response()->json(null, 204);
    }
}
