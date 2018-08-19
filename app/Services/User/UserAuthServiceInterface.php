<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/19/2018
 * Time: 12:34 PM
 */

namespace App\Services\User;

use App\Models\User;


/**
 * Class UserAuthService
 * @package App\Services\User
 */
interface UserAuthServiceInterface
{
    /**
     * @param User $user
     * @return string
     */
    public function token(User $user);

    /**
     * @param array $request
     * @return mixed
     */
    public function reset($request = []);

    /**
     * @param $email
     * @return mixed
     */
    public function forgot($email);

    /**
     * @param array $credentials
     * @return mixed
     */
    public function login($credentials = []);

    /**
     * @param array $credentials
     * @return array
     */
    public function register($credentials = []);
}