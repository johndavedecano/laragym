<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 9/14/2018
 * Time: 9:13 PM
 */

namespace App\Services\Activity;

use App\Constants;
use App\Models\Activity;

/**
 * Class ActivityCollection
 * @package App\Services\Activity
 */
class ActivityCollection
{

    public $meta = [];

    /**
     * @var Activity
     */
    public $activity;

    /**
     * ActivityCollection constructor.
     * @param Activity $activity
     */
    public function __construct(Activity $activity)
    {
        $this->activity = $activity;
    }

    /**
     * @param $builder
     * @param array $request
     * @return mixed
     */
    public function order($builder, $request = [])
    {
        $or = isset($request['order']) ? $request['order'] : 'DESC';

        $by = isset($request['order_by']) ? $request['order_by'] : 'created_at';

        if (!in_array(strtoupper($or), ['ASC', 'DESC'])) {
            $or = 'DESC';
        }

        $this->meta['order'] = $or;
        $this->meta['order_by'] = $by;

        return $builder->orderBy($by, $or);
    }

    /**
     * @param $builder
     * @param array $request
     * @return mixed
     */
    public function base($builder, $request = [])
    {
        $builder = $this->order($builder, $request);

        if (isset($request['entity_id'])) {
            $builder = $builder->where('entity_id', $request['entity_id']);
            $this->meta['entity_id'] = $request['entity_id'];
        }

        if (isset($request['type'])) {
            $builder = $builder->where('type', $request['type']);
            $this->meta['type'] = $request['type'];
        }

        if (isset($request['q'])) {
            $keyword = '%' . $request['q'] . '%';
            $builder = $builder->where('description', 'like', $keyword);
            $this->meta['q'] = $request['q'];
        }

        return $builder;
    }

    /**
     * @param array $request
     * @return mixed
     */
    public function system($request = [])
    {
        $builder = $this->activity->select('*');

        $request['type'] = Constants::ACTIVITY_SYSTEM;

        $builder = $this->base($builder, $request);

        $limit = isset($request['limit']) ? (int)$request['limit'] : 25;

        return $builder->paginate($limit);
    }

    /**
     * @param array $request
     * @return mixed
     */
    public function attendance($request = [])
    {
        $builder = $this->activity->select([
            'activities.*', 'users.name', 'users.id AS user_id', 'users.avatar', 'users.email'
        ]);

        $builder =  $builder->join('users', 'users.id', '=', 'activities.entity_id');

        $request['type'] = Constants::ACTIVITY_ATTENDANCE;

        $builder = $this->base($builder, $request);

        $limit = isset($request['limit']) ? (int)$request['limit'] : 25;

        return $builder->paginate($limit);
    }
}