<?php

namespace App\Http\Controllers\Questions;

use App\Http\Controllers\Controller;
use App\Models\Questions\QuestionsModel;
use App\ValidationFacade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuestionsController extends Controller
{
    public function getQuestions() {
        return response()->json(
            QuestionsModel::with('answers')
                ->get(),200);
    }

    public function getQuestionById(Request $request) {
        $input = ValidationFacade::validate($request->all(),[]);

        $question = DB::table('questions')
            ->where('id', $input["question_id"])
            ->first();

        return response()->json($question,200);
    }
}
