<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsReleaseDateAndTimeDurationToImdbMovieTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('imdb_movie', function($table) {
            $table->integer('runTime')->nullable();
            $table->string('releaseInfo', 255)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('imdb_movie', function($table) {
            $table->dropColumn('runTime');
            $table->dropColumn('releaseInfo');
        });
    }
}
