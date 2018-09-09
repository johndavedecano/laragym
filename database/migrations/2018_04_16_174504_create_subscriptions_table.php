<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('package_id')->unsigned();
            $table->integer('service_id')->unsigned();
            $table->integer('cycle_id')->unsigned();
            $table->integer('interval')->unsigned()->default(1);
            $table->timestamp('expires_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('suspended_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subscriptions');
    }
}
