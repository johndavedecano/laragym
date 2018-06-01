<?php

/**
 * Created by John Dave Decano<johndavedecano@gmail.com>.
 * Date: Mon, 16 Apr 2018 18:21:38 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use App\Models\HasService;
use App\Models\HasCycle;
use App\Models\HasSubscriptions;

/**
 * Class Package
 *
 * @property int $id
 * @property int $service_id
 * @property int $cycle_id
 * @property float $amount
 * @property string $name
 * @property bool $is_archived
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @package App\Models
 */
class Package extends Eloquent
{
    use HasService;

    use HasCycle;
    
    use HasSubscriptions;

    protected $casts = [
        'service_id' => 'int',
        'cycle_id' => 'int',
        'amount' => 'float',
        'is_archived' => 'bool'
    ];

    protected $fillable = [
        'service_id',
        'cycle_id',
        'amount',
        'name',
        'is_archived'
    ];
}
