<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 10:49 AM
 */

namespace App\Services\Cycle;


use App\Constants;
use App\Models\Cycle;

class CycleService implements CycleServiceInterface
{
    /**
     * @var Cycle
     */
    protected $cycle;

    /**
     * CycleService constructor.
     * @param Cycle $cycle
     */
    public function __construct(Cycle $cycle)
    {
        $this->cycle = $cycle;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        return $this->cycle->findOrFail($id);
    }

    /**
     * @param array $request
     * @return mixed
     */
    public function create($request = [])
    {
        return $this->cycle->create(array_only($request, $this->cycle->getFillable()));
    }

    /**
     * @param Cycle $cycle
     * @param array $data
     * @return Cycle
     */
    public function update(Cycle $cycle, $data = [])
    {
        $cycle->fill(array_only($data, $cycle->getFillable()));

        $cycle->save();

        return $cycle;
    }

    /**
     * @param Cycle $cycle
     * @return Cycle|bool|null
     */
    public function delete(Cycle $cycle)
    {
        $cycle->status = Constants::STATUS_DELETED;

        $cycle->save();

        return $cycle;
    }
}