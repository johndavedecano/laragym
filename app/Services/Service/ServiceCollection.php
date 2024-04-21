<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/21/2018
 * Time: 10:47 PM
 */

namespace App\Services\Service;


use App\CacheKey;
use App\Models\Service;
use Illuminate\Support\Facades\Cache;

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
    protected $per_page = 20;

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
        return Cache::remember(CacheKey::get(), 1, function () {
            return $this
                ->build()
                ->bySearch()
                ->byStatus()
                ->getBuild()
                ->paginate($this->limit());
        });
    }

    /**
     * @return mixed
     */
    public function getBuild()
    {
        return $this->builder;
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
    public function byStatus()
    {
        $this->builder = $this->builder->where('status', request()->get('status', 'active'));

        $this->meta['status'] = request()->get('status', 'active');

        return $this;
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
}