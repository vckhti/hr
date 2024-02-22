<?php

namespace App\Models;

use App\Models\Questions\QuestionsModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnswersModel extends Model
{
    protected $table = "answers";

    public $timestamps = false;

    protected $fillable =
        [
            'current_value',
            'thinking_time',
        ];

    use HasFactory;

    public function questions()
    {
        return $this->belongsTo(
            QuestionsModel::class,
            'answer_id', // Внешний ключ в таблице answers
            'id' // Локальный ключ в таблице answers
        );
    }
}
