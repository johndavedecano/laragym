<?php
/**
 * Created by PhpStorm.
 * User: Dave
 * Date: 9/10/2018
 * Time: 8:54 PM
 */

namespace App\Http\Controllers;


class HomeController extends Controller
{
    public function index()
    {
        return response()->json('welcome');
    }
}