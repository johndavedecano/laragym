<?php

/**
 * Created by John Dave Decano<johndavedecano@gmail.com>.
 * Date: Mon, 16 Apr 2018 18:21:38 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Models\HasSubscriptions;

/**
 * Class Service
 * 
 * @property int $id
 * @property string $name
 * @property bool $is_archived
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class Service extends Eloquent
{
	use HasSubscriptions;

	protected $casts = [
		'is_archived' => 'bool'
	];

	protected $fillable = [
		'name',
		'status',
		'description',
	];
}
