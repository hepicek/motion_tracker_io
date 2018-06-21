<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToImdbMovieTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('imdb_movie', function($table) {
            $table->longText('storyline')->nullable();
            $table->string('tagline', 255)->nullable();
            $table->boolean('is_serial')->default(false);
            $table->integer('seasons')->nullable();

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
            $table->dropColumn('paid');
        });
    }
}
