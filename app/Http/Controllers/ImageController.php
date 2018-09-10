<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest as Request;
use App\Http\Controllers\Controller;
use App\Models\Image;
use Imageupload;

/**
 * Class ImageController
 * @package App\Http\Controllers
 */
class ImageController extends Controller
{
    /**
     * @var Image
     */
    protected $model;
    /**
     * ImageController constructor.
     * @param Image $model
     */
    public function __construct(Image $model)
    {
        $this->middleware('auth:api', []);

        $this->model = $model;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $response = Imageupload::upload($request->file('file'));

        return response()->json($response);
    }
}
