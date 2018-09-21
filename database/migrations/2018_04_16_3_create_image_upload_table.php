<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Matriphe\Imageupload\ImageuploadModel;

class CreateImageUploadTable extends Migration
{
    public function __construct()
    {
        $this->table = (new ImageuploadModel())->getTable();
    }

    /**
     * Run the migrations.
     *
     */
    public function up()
    {
        if (! Schema::hasTable($this->table)) {
            Schema::create($this->table, function (Blueprint $table) {
                $table->increments('id');
                $table->string('original_filename')->nullable();
                $table->string('original_filepath')->nullable();
                $table->string('original_filedir')->nullable();
                $table->string('original_extension', 4)->nullable();
                $table->string('original_mime', 10)->nullable();
                $table->integer('original_filesize')->unsigned()->nullable();
                $table->smallInteger('original_width')->unsigned()->nullable();
                $table->smallInteger('original_height')->unsigned()->nullable();
                $table->string('path')->nullable();
                $table->string('dir')->nullable();
                $table->string('filename')->nullable();
                $table->string('basename')->nullable();
                $table->text('exif')->nullable();

                foreach (Config::get('imageupload.dimensions') as $key => $dimension) {
                    $table->string($key.'_path')->nullable();
                    $table->string($key.'_dir')->nullable();
                    $table->string($key.'_filename')->nullable();
                    $table->string($key.'_filepath')->nullable();
                    $table->string($key.'_filedir')->nullable();
                    $table->integer($key.'_filesize')->unsigned()->nullable();
                    $table->smallInteger($key.'_width')->unsigned()->nullable();
                    $table->smallInteger($key.'_height')->unsigned()->nullable();
                    $table->boolean($key.'_is_squared')->unsigned()->nullable();
                }

                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        if (Schema::hasTable($this->table)) {
            Schema::drop($this->table);
        }
    }
}
