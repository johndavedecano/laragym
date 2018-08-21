<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 12:59 PM
 */

namespace App\Services\Subscription;

/**
 * Class SubscriptionCollection
 * @package App\Services\Subscription
 */
class SubscriptionCollection
{
    /**
     * @var array
     */
    public $meta = [];

    /**
     * @var mixed
     */
    public $builder;
    /**
     * @var int
     */
    protected $per_page = 30;

    /**
     * @return mixed
     */
    public function get()
    {
        return $this
            ->start()
            ->byUser()
            ->byPackage()
            ->byCycle()
            ->byService()
            ->bySuspended()
            ->byExpired()
            ->build()
            ->paginate($this->getLimit());

    }

    /**
     * @return mixed
     */
    public function start()
    {
        return $this->model->orderBy('created_at', 'DESC');
    }

    /**
     * @return mixed
     */
    public function build()
    {
        return $this->builder;
    }

    /**
     * @return array
     */
    public function getMeta()
    {
        return $this->meta;
    }

    /**
     * @return $this
     */
    public function byUser()
    {
        if (request()->has('user_id') && request()->get('user_id')) {
            $this->builder = $this->builder->where('user_id', request()->get('user_id'));
            $this->meta['user_id'] = request()->get('user_id');
        }

        return $this;
    }

    /**
     * @return $this
     */
    public function byPackage()
    {
        if (request()->has('package_id') && request()->get('package_id')) {
            $this->builder = $this->builder->where('package_id', request()->get('package_id'));
            $this->meta['package_id'] = request()->get('package_id');
        }
        return $this;
    }

    /**
     * @return $this
     */
    public function byCycle()
    {
        if (request()->has('cycle_id') && request()->get('cycle_id')) {
            $this->builder = $this->builder->where('cycle_id', request()->get('cycle_id'));
            $this->meta['cycle_id'] = request()->get('cycle_id');
        }
        return $this;
    }

    /**
     * @return $this
     */
    public function byService()
    {
        if (request()->has('service_id') && request()->get('service_id')) {
            $this->builder = $this->builder->where('service_id', request()->get('service_id'));
            $this->meta['service_id'] = request()->get('service_id');
        }
        return $this;
    }

    /**
     * @return $this
     */
    public function bySuspended()
    {
        if (request()->has('is_suspended') && request()->get('is_suspended')) {
            $this->builder = $this->builder->where('is_suspended', request()->get('is_suspended'));
            $this->meta['is_suspended'] = request()->get('is_suspended');
        }
        return $this;
    }

    /**
     * @return $this
     */
    public function byExpired()
    {
        if (request()->has('is_expired') && request()->get('is_expired')) {
            $this->builder = $this->builder->where('is_expired', request()->get('is_expired'));
            $this->meta['is_expired'] = request()->get('is_expired');
        }
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLimit(): mixed
    {
        $limit = request()->get('per_page', $this->per_page);
        return $limit;
    }
}