<?php

namespace App\Http\Controllers\Questions;

use App\Http\Controllers\Controller;
use App\Models\Questions\QuestionsModel;

class QuestionsController extends Controller
{
    public function getQuestions() {
        return response()->json(QuestionsModel::get(),200);
    }
}
