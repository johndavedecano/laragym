<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubscriptionRequest;
use App\Http\Requests\UpdateSubscriptionRequest;
use App\Models\Package;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('user_id')) {
            return response()->json(
                Subscription::where('user_id', $request->get('user_id'))
                    ->with('user')
                    ->with('package')
                    ->with('package.cycle')
                    ->with('package.services')->get()
            );
        }

        $results = QueryBuilder::for(Subscription::class)
            ->allowedFilters(
                AllowedFilter::exact('package_id'),
                AllowedFilter::exact('user_id'),
                AllowedFilter::exact('status'),
            )
            ->with('user')
            ->with('package')
            ->with('package.cycle')
            ->with('package.services')
            ->paginate(request()->get('per_page', 15))
            ->appends(request()->query());

        return response()->json($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSubscriptionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSubscriptionRequest $request)
    {
        $package = Package::findOrFail($request->package_id);

        $interval = $request->has('interval') ? $request->interval : 1;

        $model = Subscription::create([
            'package_id' => $request->package_id,
            'user_id' => $request->user_id,
            'interval' => $interval,
            'expires_at' => Carbon::now()->addDays($package->cycle->num_days * $interval),
        ]);

        return response()->json($model);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function show(Subscription $subscription)
    {
        $subscription->load('user')->load('package');

        return response()->json($subscription);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSubscriptionRequest  $request
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSubscriptionRequest $request, Subscription $subscription)
    {
        $params = $request->only([
            'status',
            'expires_at',
        ]);

        if ($request->has('package_id') && $request->package_id != $subscription->package_id) {
            $package = Package::findOrFail($request->package_id);

            $interval = $request->has('interval') ? $request->interval : $subscription->interval;

            $params['expires_at'] = Carbon::now()->addDays($package->cycle->num_days * $interval);
        }

        if ($request->has('status') && $request->status === 'suspended') {
            $params['suspended_at'] = Carbon::now();
        }

        if ($request->has('user_id')) {
            $params['user_id'] = $request->user_id;
        }

        $subscription->update($params);

        $subscription->fresh();

        return response()->json($subscription);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subscription $subscription)
    {
        $subscription->delete();

        return response()->json(null, 204);
    }
}
