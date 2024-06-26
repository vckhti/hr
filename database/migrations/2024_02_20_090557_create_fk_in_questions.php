<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFkInQuestions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('questions', function($table) {
            $table->integer('answer_id')->unsigned()->nullable();
            $table->foreign('answer_id')->references('id')->on('answers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::table('questions', function($table) {
//            $table->dropForeign('answer_id');
//            $table->dropColumn('answer_id');
//        });
         Schema::dropIfExists('questions');
    }
}
