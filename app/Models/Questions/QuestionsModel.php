<?php

namespace App\Models\Questions;

use App\Models\AnswersModel;
use Database\Factories\QuestionsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionsModel extends Model
{
    protected $table = "questions";

    public $timestamps = false;


    protected $fillable =
        [
            'question',
            'variant1',
            'variant2',
            'variant3',
            'variant4',
            'variant5',
            'variant6',
            'right_variant',
        ];

    use HasFactory;

    protected static function newFactory()
    {
        return QuestionsFactory::new();
    }

    public function answers()
    {
        return $this->hasOne(
            AnswersModel::class,
            'question_id', // Внешний ключ в таблице questions
            'id' // Локальный ключ в таблице questions
        );
    }
}
