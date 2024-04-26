<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('package_id');
            $table->integer('interval')->default(1);
            $table->timestamp('expires_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('suspended_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('status')->default('active');
            $table->timestamps();
            $table->softDeletes();

            $table->index('status');

            $table->foreign('package_id')->references('id')->on('packages');
            $table->foreign('user_id')->references('id')->on('users');
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
};
