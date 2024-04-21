<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 9/11/2018
 * Time: 8:35 PM
 */

namespace App;


class CacheKey
{
    /**
     * @return string
     */
    public static function get()
    {
        return md5(request()->getUri());
    }
}
