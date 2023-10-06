<?php

namespace App\Models\Questions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionsModel extends Model
{
    protected $table = "questions";


    protected $fillable =
        [
            'variant1',
            'variant2',
            'variant3',
            'variant4',
            'variant5',
            'variant6',
            'execution_time',
            'right_variant',
            'history' ,
        ];

    use HasFactory;
}
