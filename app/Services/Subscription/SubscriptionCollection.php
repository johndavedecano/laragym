<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 12:59 PM
 */

namespace App\Services\Subscription;

use App\Models\Subscription;

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

    public function __construct(Subscription $model)
    {
        $this->model = $model;
    }

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
            ->byStatus()
            ->byQuery()
            ->end()
            ->paginate($this->getLimit());

    }

    /**
     * @return mixed
     */
    public function start()
    {
        $this->builder = $this->model
            ->orderBy('created_at', 'DESC')
            ->with('user')
            ->with('cycle')
            ->with('package')
            ->with('service');

        return $this;
    }

    /**
     * @return mixed
     */
    public function end()
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
    public function byQuery()
    {
        if (request()->has('q') && request()->get('q')) {
            $keyword = '%' . request()->get('q') . '%';
            $this->builder = $this->builder->where('user.name', 'like', $keyword);
            $this->meta['q'] = request()->get('q');
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
    public function byStatus()
    {
        if (request()->has('status') && request()->get('status')) {
            $this->builder = $this->builder->where('status', request()->get('status'));
            $this->meta['status'] = request()->get('status');
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getLimit()
    {
        $limit = request()->get('per_page', $this->per_page);

        return $limit;
    }
}