<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 12:35 PM
 */

namespace App\Services\Cycle;

use App\Exceptions\DefaultEntityException;
use App\Exceptions\SubscriptionException;
use App\Models\Cycle;

interface CycleServiceInterface
{
    /**
     * @param $id
     * @return mixed
     */
    public function find($id);

    /**
     * @param array $request
     * @return mixed
     */
    public function create($request = []);

    /**
     * @param Cycle $cycle
     * @param array $data
     * @return Cycle
     */
    public function update(Cycle $cycle, $data = []);

    /**
     * @param Cycle $cycle
     * @return bool|null
     * @throws DefaultEntityException
     * @throws SubscriptionException
     */
    public function delete(Cycle $cycle);
}