<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 8/18/2018
 * Time: 10:38 PM
 */

namespace App\Services\User;

use App\Exceptions\AuthException;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Password;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;

/**
 * Class UserAuthService
 * @package App\Services\User
 */
class UserAuthService implements UserAuthServiceInterface
{
    /**
     * @var JWTAuth
     */
    protected $jwt;

    /**
     * @var User
     */
    public $user;

    /**
     * UserAuthService constructor.
     * @param User $user
     * @param JWTAuth $jwt
     */
    public function __construct(User $user, JWTAuth $jwt)
    {
        $this->user = $user;

        $this->jwt = $jwt;
    }

    /**
     * @param User $user
     * @return string
     */
    public function token(User $user)
    {
        return $this->jwt->fromUser($user);
    }

    /**
     * @param array $request
     * @return mixed
     */
    public function reset($request = [])
    {
        $response = $this->getPasswordBroker()->reset(
            $request, function ($user, $password) {
                $user->password = $password;
                $user->save();
            }
        );

        if($response !== Password::PASSWORD_RESET) {
            throw new HttpException(500);
        }

        return $this->user->where('email', $request['email'])->first();
    }

    /**
     * @return mixed
     */
    private function getPasswordBroker()
    {
        return Password::broker();
    }

    /**
     * @param $email
     * @return mixed
     */
    public function forgot($email)
    {
        $user = $this->user->where('email', '=', $email)->first();

        if(!$user) {
            throw new ModelNotFoundException();
        }

        $broker = $this->getPasswordBroker();

        $sendingResponse = $broker->sendResetLink(['email' => $email]);

        if($sendingResponse !== Password::RESET_LINK_SENT) {
            throw new HttpException(500);
        }

        return $user;
    }

    public function login($credentials = [])
    {
        $token = auth()->guard()->attempt($credentials);

        if (!$token) {
            throw new AuthException('Invalid username or password.');
        }

        $user = auth()->guard()->user();

        $user->logLastLogin();

        return $user;
    }

    /**
     * @param array $credentials
     * @return array
     */
    public function register($credentials = [])
    {
        $user = $this->user->create(array_only($credentials, $this->user->getFillable()));

        return $user;
    }
}