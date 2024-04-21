<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/18/2018
 * Time: 9:52 PM
 */

namespace App\Services\User;

use App\Exceptions\SubscriptionException;
use App\Models\User;

/**
 * Class UserService
 * @package App\Services\User
 */
class UserService
{
    /**
     * @var User
     */
    protected $user;

    /**
     * UserService constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getCurrentUser()
    {
        return auth()->guard()->user();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        return $this->user->findOrFail($id);
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create($data = [])
    {
        $data = array_only($data, $this->user->getFillable());

        $data = $this->sanitizeBooleans($data);

        return $this->user->create($data);
    }

    /**
     * @param User $user
     * @param array $data
     * @return User
     */
    public function update(User $user, $data = [])
    {
        $data = array_only($data, $this->user->getFillable());

        $data = $this->sanitizeBooleans($data);

        $this->user->where('id', $user->id)->update($data);

        return $this->user->find($user->id);
    }

    /**
     * @param User $user
     * @return bool|null
     * @throws SubscriptionException
     */
    public function delete(User $user)
    {
        return $this->user->where('id', $user->id)->update('is_deleted', true);
    }

    /**
     * @param $data
     * @return mixed
     */
    public function sanitizeBooleans($data)
    {
        if (isset($data['is_admin'])) {
            $data['is_admin'] = filter_var($data['is_admin'], FILTER_VALIDATE_BOOLEAN);
        }

        if (isset($data['is_active'])) {
            $data['is_active'] = filter_var($data['is_active'], FILTER_VALIDATE_BOOLEAN);
        }

        if (isset($data['is_deleted'])) {
            $data['is_deleted'] = filter_var($data['is_deleted'], FILTER_VALIDATE_BOOLEAN);
        }
        return $data;
    }
}
