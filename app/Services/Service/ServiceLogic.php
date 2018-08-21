<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/21/2018
 * Time: 11:09 PM
 */

namespace App\Services\Service;

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
     * @return bool|null
     * @throws DefaultEntityException
     * @throws SubscriptionException
     */
    public function delete(Service $model)
    {
        if ($model->is_default) {
            throw new DefaultEntityException('You cannot delete a default entity.');
        }

        if ($model->subscriptions()->count() > 0) {
            throw new SubscriptionException('You cannot delete an entity that has existing subscriptions.');
        }

        return $model->delete();
    }
}