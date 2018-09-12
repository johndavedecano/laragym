<?php

/**
 * Created by John Dave Decano<johndavedecano@gmail.com>.
 * Date: Mon, 16 Apr 2018 18:21:38 +0000.
 */

namespace App\Models;

use Hash;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\HasSubscriptions;

/**
 * Class User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $account_number
 * @property string $mobile
 * @property string $avatar
 * @property \Carbon\Carbon $date_of_birth
 * @property string $address
 * @property string $city
 * @property string $state
 * @property string $postal_code
 * @property bool $is_admin
 * @property \Carbon\Carbon $last_login
 *
 * @package App\Models
 */
class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    
    use HasSubscriptions;

    protected $casts = [
        'is_admin' => 'bool',
        'is_active' => 'bool',
        'is_deleted' => 'bool'
    ];

    protected $dates = [
        'last_login'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $fillable = [
        'name',
        'email',
        'password',
        'remember_token',
        'account_number',
        'mobile',
        'avatar',
        'date_of_birth',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'is_admin',
        'is_deleted',
        'last_login'
    ];

    /**
     * Save the last login timestamp.
     *
     * @return object
     */
    public function logLastLogin()
    {
        $this->last_login = date('Y-m-d H:i:s');
        $this->save();

        return $this;
    }
    
    /**
     * Automatically create user account number.
     *
     * @param  string  $value
     * @return void
     */
    public function setAccountNumberAttribute($value)
    {
        $random = rand(10, 500);
        
        $this->attributes['account_number'] = $value.$random;
    }

    /**
     * Automatically creates hash for the user password.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
