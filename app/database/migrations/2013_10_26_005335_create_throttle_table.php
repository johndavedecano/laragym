<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateThrottleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('throttle', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('user_id');
			$table->string('ip_address', 255)->nullable();
			$table->integer('attempts');
			$table->boolean('suspended');
			$table->boolean('banned');
			$table->datetime('last_attempt_at')->nullable();
			$table->datetime('suspended_at')->nullable();
			$table->datetime('banned_at')->nullable();
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
		Schema::drop('throttle');
	}

}
