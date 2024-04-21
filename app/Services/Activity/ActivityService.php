<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 9/14/2018
 * Time: 9:13 PM
 */

namespace App\Services\Activity;

use App\Constants;
use App\Models\Activity;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Class ActivityService
 * @package App\Services\Activity
 */
class ActivityService
{
    /**
     * @var Activity
     */
    public $activity;

    /**
     * ActivityService constructor.
     * @param Activity $activity
     */
    public function __construct(Activity $activity)
    {
        $this->activity = $activity;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function find($id)
    {
        $results = $this->activity->find($id);

        if (!$results) {
            throw new ModelNotFoundException();
        }

        return $results;
    }

    /**
     * @param $userId
     * @param $description
     * @return mixed
     */
    public function attend($userId, $description)
    {
        return $this->activity->create([
            'entity_id' => $userId,
            'type' => Constants::ACTIVITY_ATTENDANCE,
            'description' => "User #$userId has $description",
        ]);
    }

    /**
     * @param $id
     * @param $description
     */
    public static function log($id, $description)
    {
        Activity::create([
            'entity_id' => $id,
            'type' => Constants::ACTIVITY_SYSTEM,
            'description' => $description,
        ]);
    }

    /**
     * @param Activity $activity
     * @return bool|null
     * @throws \Exception
     */
    public function delete(Activity $activity)
    {
        return $activity->delete();
    }
}