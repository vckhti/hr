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
                ->take(20)
                ->get(),200);

//        $questions = DB::table('questions')
//            ->whereIn('id' , [
//                1,
//                2,
//                3,
//                4,
//                5,
//                6,
//                7,
//                8,
//                9,
//                10,
//                11,
//                12,
//                13,
//                14,
//                15,
//                16,
//                17,
//                18,
//                19,
//                20
//
//            ])
//            ->get();
//
//        return response()->json($questions,200);
    }

    public function getQuestionById(Request $request) {
        $input = ValidationFacade::validate($request->all(),[]);

        $question = DB::table('questions')
            ->where('id', $input["question_id"])
            ->first();

        return response()->json($question,200);
    }
}
