<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/21/2018
 * Time: 10:47 PM
 */

namespace App\Services\Service;


use App\Models\Service;

/**
 * Class ServiceCollection
 * @package App\Services\Service
 */
class ServiceCollection
{
    /**
     * @var mixed
     */
    public $meta = [];

    /**
     * @var Service
     */
    protected $service;

    /**
     * @var mixed
     */
    protected $builder;

    /**
     * @var int
     */
    protected $per_page = 15;

    /**
     * ServiceCollection constructor.
     * @param Service $service
     */
    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    /**
     * @return mixed
     */
    public function get()
    {
        return $this
            ->build()
            ->byArchived()
            ->byArchived()
            ->builder
            ->paginate($this->limit());
    }

    /**
     * @return $this
     */
    public function build()
    {
        $this->builder = $this->service->orderBy('name', 'ASC');

        return $this;
    }

    public function limit()
    {
        return request()->get('per_page', $this->per_page);
    }

    /**
     * @return $this
     */
    public function bySearch()
    {
        if (request()->has('q') && request()->get('q')) {
            $keyword = '%' . request()->get('q') . '%';
            $this->builder = $this->builder->where('name', 'like', $keyword);
            $this->meta['q'] = request()->get('q');
        }

        return $this;
    }

    /**
     * @return $this
     */
    public function byArchived()
    {
        if (request()->has('is_archived')) {
            $this->builder = $this->builder->where('is_archived', request()->get('is_archived'));
            $this->meta['is_archived'] = request()->get('is_archived');
        }

        return $this;
    }
}