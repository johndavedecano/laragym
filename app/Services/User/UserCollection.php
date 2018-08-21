<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/18/2018
 * Time: 9:38 PM
 */

namespace App\Services\User;


use App\Models\User;

/**
 * Class UserCollection
 * @package App\Services\User
 */
class UserCollection implements UserCollectionInteface
{
    /**
     * Pagination per_page.
     *
     * @var integer
     */
    public $per_page = 30;

    /**
     * @var User
     */
    protected $model;

    /**
     * @var mixed
     */
    protected $builder;

    /**
     * @var array
     */
    public $meta = [];

    /**
     * UserCollection constructor.
     * @param User $model
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * @return mixed
     */
    public function get()
    {
        $this->builder = $this->model->orderBy('name', 'ASC');

        $this->builder = $this->search($this->builder);

        return $this->builder->paginate($this->getLimit());
    }

    /**
     * @return mixed
     */
    public function getLimit()
    {
        return request()->get('per_page', $this->per_page);
    }

    /**
     * @return string
     */
    public function getKeyword()
    {
        return '%'.request()->get('q').'%';
    }

    /**
     * @param $builder
     * @return mixed
     */
    public function search($builder)
    {
        if (request()->has('q') && request()->get('q')) {
            $builder = $builder
                ->where('name', 'like', $this->getKeyword())
                ->orWhere('account_number', 'like', $this->getKeyword())
                ->orWhere('email', 'like', $this->getKeyword());

            $this->meta['q'] = request()->get('q');
        }

        return $builder;
    }
}