<?php

namespace App\Api\V1\Controllers;

use App\Api\V1\Requests\ImageRequest as Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use Imageupload;

class ImageController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(Image $model)
    {
        $this->middleware('auth:api', []);

        $this->model = $model;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $response = Imageupload::upload($request->file('file'));

        return response()->json($response);
    }
}
