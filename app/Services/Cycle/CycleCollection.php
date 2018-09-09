<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 10:42 AM
 */

namespace App\Services\Cycle;


use App\Models\Cycle;

class CycleCollection implements CycleCollectionInterface
{
    /**
     * @var array
     */
    public $meta = [];
    /**
     * @var Cycle
     */
    public $model;

    /**
     * Pagination per_page.
     *
     * @var integer
     */
    public $per_page = 30;

    /**
     * CycleCollection constructor.
     * @param Cycle $model
     */
    public function __construct(Cycle $model)
    {
        $this->model = $model;
    }

    /**
     * @return mixed
     */
    public function get()
    {
        $builder = $this->model->orderBy('name', 'ASC');

        $builder = $this->search($builder);

        $builder = $this->status($builder);

        $limit = request()->get('per_page', $this->per_page);

        return $builder->paginate($limit);
    }

    /**
     * @param $builder
     * @return mixed
     */
    public function status($builder)
    {
        if (request()->has('status')) {
            $builder = $builder->where('status', request()->get('status'));
            $this->meta['status'] = request()->get('status');
        }

        return $builder;
    }

    /**
     * @param $builder
     * @return mixed
     */
    public function search($builder)
    {
        if (request()->has('q') && request()->get('q')) {
            $keyword = '%' . request()->get('q') . '%';
            $builder = $builder->where('name', 'like', $keyword);
            $this->meta['q'] = request()->get('q');
        }
        return $builder;
    }
}