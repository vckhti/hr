<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tests', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('subject_metter_ids')->default(1);
            $table->integer('user_id');
            $table->integer('questions_count');
            $table->text('questions_ids');
            $table->integer('right_questions');
            $table->integer('wrong_questions')->nullable();
            $table->integer('testing_times')->nullable();
            $table->integer('testing_max_time')->nullable();
            $table->text('comeback_ids')->nullable();
            $table->text('history_ids')->nullable();
            $table->text('answer_times_ids')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tests');
    }
}
