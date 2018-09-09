<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/21/2018
 * Time: 11:09 PM
 */

namespace App\Services\Service;

use App\Constants;
use App\Exceptions\DefaultEntityException;
use App\Exceptions\SubscriptionException;
use App\Models\Service;

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
        return $this->service->findOrFail($id);
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
     * @return bool
     */
    public function update(Service $service, $data = [])
    {
        return $service->update(array_only($data, $service->getFillable()));
    }

    /**
     * @param Service $model
     * @return Service
     */
    public function delete(Service $model)
    {
        $model->status = Constants::STATUS_DELETED;

        $model->save();

        return $model;
    }
}