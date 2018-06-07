<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('common_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->date('dob');
            $table->dateTime('date_registered');
            $table->timestamps(); //date registred, date updated
            $table->integer('user_status_id');
            $table->dateTime('date_deactivated');
            $table->string('img_url');
            $table->dateTime('last_login_date');
            //  $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
