<?php

namespace App\Http\Controllers\Answers;

use App\Http\Controllers\Controller;
use App\Models\AnswersModel;
use App\Models\UsersModel;
use App\ValidationFacade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnswerController extends Controller
{
    public function updateAnswer(Request $request) {
        $input = ValidationFacade::validate($request->all(),[]);


        $answer= new AnswersModel();
        $user = UsersModel::getCurrent();

        $answer->user_id = $user->id;
        $answer->question_id = $input["question_id"];
        $answer->thinking_time = $input["thinking_time"];

        if (!empty($input["current_choiсe"])) {
            $answer->current_value = $input["current_choiсe"];
        }

        $answer->save();
        // dd($question);

        return $answer;
    }

    public function getAnswersByQuestionId(Request $request) {
        $input = ValidationFacade::validate($request->all(),[]);

        $answers = DB::table('answers')
            ->where('user_id', $input["user_id"])
            ->where('question_id', $input["question_id"])
            ->where('current_value','!=', null)
            ->orderByDesc('created_at')
            ->get();


        return response()->json($answers ,200);
    }
}
