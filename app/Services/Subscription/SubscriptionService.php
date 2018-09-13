<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 12:58 PM
 */

namespace App\Services\Subscription;


use App\Models\Cycle;
use App\Models\Package;
use App\Models\Subscription;
use Carbon\Carbon;

/**
 * Class SubscriptionService
 * @package App\Services\Subscription
 */
class SubscriptionService
{
    /**
     * @var Subscription
     */
    protected $subscription;

    /**
     * @var Cycle
     */
    protected $cycle;

    /**
     * @var Package
     */
    protected $package;

    /**
     * SubscriptionService constructor.
     * @param Subscription $subscription
     * @param Package $package
     * @param Cycle $cycle
     */
    public function __construct(Subscription $subscription, Package $package, Cycle $cycle)
    {
        $this->subscription = $subscription;

        $this->package = $package;

        $this->cycle = $cycle;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        return $this->subscription->findOrFail($id);
    }

    /**
     * @param array $request
     * @return mixed
     */
    public function create($request = [])
    {
        $package = $this->package->findOrFail($request['package_id']);

        $cycle = $this->cycle->findOrFail($package->cycle_id);

        $interval = isset($request['interval']) ? $request['interval'] : 1;

        $model = $this->subscription->create([
            'package_id'   => $request['package_id'],
            'user_id'      => $request['user_id'],
            'service_id'   => $package->service_id,
            'cycle_id'     => $package->cycle_id,
            'interval'     => $interval,
            'expires_at'   => Carbon::now()->addDays($cycle->num_days * $interval),
        ]);

        return $model;
    }
}