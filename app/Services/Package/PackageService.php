<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 12:58 PM
 */

namespace App\Services\Package;

use App\Constants;
use App\Models\Package;
use Illuminate\Support\Facades\Cache;

/**
 * Class PackageService
 * @package App\Services\Package
 */
class PackageService
{
    /**
     * PackageService constructor.
     * @param Package $model
     */
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
        return Cache::remember('package-'.$id, 1, function () use ($id) {
            return $this->model->findOrFail($id);
        });
    }

    /**
     * @param $id
     * @return mixed
     */
    public function forget($id)
    {
        return Cache::forget('package-'.$id);
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

        $this->forget($package->id);

        return $package;
    }


    /**
     * @param Package $package
     * @return Package
     */
    public function destroy(Package $package)
    {
        $package->status = Constants::STATUS_DELETED;

        $package->save();

        $this->forget($package->id);

        return $package;
    }
}