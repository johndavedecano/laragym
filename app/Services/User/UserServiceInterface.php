<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/18/2018
 * Time: 10:35 PM
 */

namespace App\Services\User;

use App\Exceptions\SubscriptionException;
use App\Models\User;


/**
 * Class UserService
 * @package App\Services\User
 */
interface UserServiceInterface
{
    /**
     * @param $id
     * @return mixed
     */
    public function find($id);

    /**
     * @param array $data
     * @return mixed
     */
    public function create($data = []);

    /**
     * @param User $user
     * @param array $data
     * @return User
     */
    public function update(User $user, $data = []);

    /**
     * @param User $user
     * @return bool|null
     * @throws SubscriptionException
     */
    public function delete(User $user);
}