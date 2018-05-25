<?php

return [

  /*
   * Library used to manipulate image.
   *
   * Options: gd (default), imagick, gmagick
   */
  'library' => env('IMAGEUPLOAD_LIBRARY', 'gd'),

  /*
   * Quality for JPEG type.
   *
   * Scale: 1-100;
   */
  'quality' => env('IMAGEUPLOAD_QUALITY', 90),

  /*
   * Upload directory. Make sure this is can be accessed by public and writable.
   *
   * Default: public/uploads/images
   */
  'path' => public_path('uploads/images'),

  /*
   * Upload images to s3. If TRUE will use s3 disk to store images, if FALSE then s3 disk will not be used.
   *
   * Example:
   *     - TRUE: Images will be saved to s3 and the local filesystem
   *     - FALSE (default): Images will be save to local filesystem only`
   */
  's3_enabled' => false,

  /*
   * Upload directory for s3.
   *
   * Default: uploads/images
   */
  's3_path' => 'uploads/images',

  /*
    * Use original name. If set to false, will use hashed name.
    *
    * Options:
    *     - original (default): use original filename in "slugged" name
    *     - hash: use filename hash as new file name
    *     - random: use random generated new file name
    *     - timestamp: use uploaded timestamp as filename
    *     - custom: user must provide new name, if not will use original filename
    */
  'newfilename' => env('IMAGEUPLOAD_NEWFILENAME', 'original'),

  /*
   * Sizes, used to crop and create multiple size.
   *
   * array(width, height, squared), if square set to TRUE, image will be in square
   */
   'dimensions' => [
        'square50' => [50, 50, true],
        'square100' => [100, 100, true],
        'square200' => [200, 200, true],
        'square400' => [400, 400, true],

        'size50' => [50, 50, false],
        'size100' => [100, 100, false],
        'size200' => [200, 200, false],
        'size400' => [400, 400, false],
   ],

   /*
    * Dimension identifier. If TRUE will use dimension name as suffix, if FALSE use directory.
    *
    * Example:
    *     - TRUE (default): newname_square50.png, newname_size100.jpg
    *     - FALSE: square50/newname.png, size100/newname.jpg
    */
   'suffix' => true,

   /*
    * Get the EXIF data. PHP must be compiled in with --enable-exif to use this method.
    * Windows users must also have the mbstring extension enabled.
    *
    * Example:
    *     - TRUE: get the exif data if exists
    *     - FALSE (default): ignore exif data
    */
   'exif' => env('IMAGEUPLOAD_EXIF', false),

   /*
    * The return output type.
    *
    * Options:
    *     - collection: set output as Illuminate\Support\Collection
    *     - json: set output as JSON
    *     - db: set output to database and return Model collection
    *     - array (default): set output as array
    */
   'output' => env('IMAGEUPLOAD_OUTPUT', 'array'),

   /*
    * Table name to hold the image data in database. Will be used in Model.
    */
    'table' => 'image_uploads',

];
