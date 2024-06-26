<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->increments('id');
            $table->text('question');
            $table->text('variant1');
            $table->text('variant2');
            $table->text('variant3');
            $table->text('variant4');
            $table->text('variant5');
            $table->text('variant6');
            $table->integer('execution_time_id')->nullable();
            $table->text('right_variant');
            $table->integer('history_id')->nullable();
            $table->integer('come_back_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
