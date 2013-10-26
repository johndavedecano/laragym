<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMembersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('members', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('number');
			$table->string('first_name', 50);
			$table->string('last_name', 50);
			$table->string('address', 50);
			$table->string('phone', 50);
			$table->date('dob');
			$table->string('email', 50);
			$table->string('photo', 50);
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
		Schema::drop('members');
	}

}
