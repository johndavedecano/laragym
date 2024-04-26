<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 9/13/2018
 * Time: 11:21 PM
 */

namespace App\Http\Controllers\Api;


use App\CacheKey;
use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Service;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class StatisticsController extends Controller
{
    /**
     * @return mixed
     */
    public function services()
    {
        $count = Cache::remember(CacheKey::get(), 15, function () {
            return Service::where('status', 'active')->count();
        });

        return response()->json($count);
    }

    public function packages()
    {
        $count = Cache::remember(CacheKey::get(), 15, function () {
            return Package::where('status', 'active')->count();
        });

        return response()->json($count);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function members()
    {
        $count = Cache::remember(CacheKey::get(), 15, function () {
            return User::where('is_admin', false)->count();
        });

        return response()->json($count);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function subscriptions()
    {
        $count = Cache::remember(CacheKey::get(), 15, function () {
            return Subscription::where('status', 'active')->count();
        });

        return response()->json($count);
    }
}
