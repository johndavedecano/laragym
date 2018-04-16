<?php

/**
 * Created by John Dave Decano<johndavedecano@gmail.com>.
 * Date: Mon, 16 Apr 2018 18:21:38 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

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
class User extends Eloquent
{
	protected $casts = [
		'is_admin' => 'bool'
	];

	protected $dates = [
		'date_of_birth',
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
		'is_admin',
		'last_login'
	];
}
