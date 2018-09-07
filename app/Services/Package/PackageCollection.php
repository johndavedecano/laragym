<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 12:58 PM
 */

namespace App\Services\Package;


use App\Models\Package;

class PackageCollection
{
    /**
     * @var int
     */
    public $per_page = 15;

    /**
     * @var array
     */
    public $meta = [];

    /**
     * @var Package
     */
    public $model;

    /**
     * PackageCollection constructor.
     * @param Package $model
     */
    public function __construct(Package $model)
    {
        $this->model = $model;
    }

    /**
     * @return mixed
     */
    public function get()
    {
        $builder = $this->model->orderBy('name', 'ASC');

        $builder = $builder->with('cycle')->with('service');

        if (request()->has('q') && request()->get('q')) {
            $keyword = '%'.request()->get('q').'%';
            $builder = $builder->where('name', 'like', $keyword);
            $this->meta['q'] = request()->get('q');
        }

        if (request()->has('is_archived')) {
            $builder = $builder->where('is_archived', request()->get('is_archived'));
            $this->meta['is_archived'] = request()->get('is_archived');
        }

        $limit = request()->get('per_page', $this->per_page);

        return $builder->paginate($limit);
    }
}