<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImdbEpisodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imdb_episodes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('show_id');
            $table->integer('episode_id');
            $table->integer('season');
            $table->integer('episode');
            $table->string('title', 255);
            $table->string('plot', 255);
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
        Schema::dropIfExists('imdb_episodes');
    }
}
