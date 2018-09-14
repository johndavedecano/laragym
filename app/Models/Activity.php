<?php

/**
 * Created by John Dave Decano<johndavedecano@gmail.com>.
 * Date: Mon, 16 Apr 2018 18:21:38 +0000.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Activity
 * @package App\Models
 */
class Activity extends Model
{
    /**
     * @var array
     */
	protected $fillable = [
        'entity_id',
        'type',
		'description'
	];
}
