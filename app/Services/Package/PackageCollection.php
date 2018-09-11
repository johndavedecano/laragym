<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 12:58 PM
 */

namespace App\Services\Package;


use App\CacheKey;
use App\Models\Package;
use Illuminate\Support\Facades\Cache;

class PackageCollection
{
    /**
     * @var int
     */
    public $per_page = 20;

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

        $builder = $builder->where('status', request()->get('status', 'active'));

        $this->meta['status'] = request()->get('status', 'active');

        $limit = request()->get('per_page', $this->per_page);

        return Cache::remember(CacheKey::get(), 1, function () use ($builder, $limit) {
            return $builder->paginate($limit);
        });
    }
}