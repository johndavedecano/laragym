<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 12:58 PM
 */

namespace App\Services\Package;


use App\Exceptions\SubscriptionException;
use App\Models\Package;

class PackageService
{
    public function __construct(Package $model)
    {
        $this->model = $model;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * @param array $request
     * @return mixed
     */
    public function create($request = [])
    {
        return $this->model->create(array_only($request, $this->model->getFillable()));
    }

    /***
     * @param Package $package
     * @param array $request
     * @return Package
     */
    public function update(Package $package, $request = [])
    {
        $package->update(array_only($request, $package->getFillable()));

        return $package;
    }

    /**
     * @param Package $package
     * @return bool|null
     * @throws \Exception
     */
    public function destroy(Package $package)
    {
        if ($package->subscriptions()->count() > 0) {
            throw new SubscriptionException('You cannot delete an entity that has existing subscriptions.');
        }

        return $package->delete();
    }
}