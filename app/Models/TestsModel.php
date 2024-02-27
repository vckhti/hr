<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestsModel extends Model
{
    protected $table = "tests";

    public $timestamps = true;

    protected $fillable = [
        'id',
        'subject_metter_ids',
        'user_id',
        'questions_count',
        'questions_ids',
        'right_questions',
        'wrong_questions',
        'testing_times',
        'testing_max_time',
        'comeback_ids',
        'history_ids',
        'answer_times_ids',
    ];

    use HasFactory;
}
