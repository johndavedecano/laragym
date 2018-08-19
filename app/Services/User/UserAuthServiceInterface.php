<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/18/2018
 * Time: 10:54 PM
 */

namespace App\Services\User;

interface UserAuthServiceInterface
{
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