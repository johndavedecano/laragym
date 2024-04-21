<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/21/2018
 * Time: 11:09 PM
 */

namespace App\Services\Service;

use App\CacheKey;
use App\Constants;
use App\Models\Service;
use Illuminate\Support\Facades\Cache;

/**
 * Class ServiceLogic
 * @package App\Services\Service
 */
class ServiceLogic
{
    /**
     * @var Service
     */
    protected $service;

    /**
     * ServiceLogic constructor.
     * @param Service $service
     */
    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        return Cache::remember('service-'.$id, 1, function () use ($id) {
            return $this->service->findOrFail($id);
        });
    }

    /**
     * @param $id
     * @return mixed
     */
    public function forget($id)
    {
        return Cache::forget('service-'.$id);
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create($data = [])
    {
        return $this->service->create(array_only($data, $this->service->getFillable()));
    }

    /**
     * @param Service $service
     * @param array $data
     * @return Service
     */
    public function update(Service $service, $data = [])
    {
        $service->update(array_only($data, $service->getFillable()));

        $this->forget($service->id);

        return $service;
    }

    /**
     * @param Service $service
     * @return Service
     */
    public function delete(Service $service)
    {
        $service->status = Constants::STATUS_DELETED;

        $service->save();

        $this->forget($service->id);

        return $service;
    }
}