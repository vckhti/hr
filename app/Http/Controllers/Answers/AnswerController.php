<?php

namespace App\Http\Controllers\Answers;

use App\Http\Controllers\Controller;
use App\Models\AnswersModel;
use App\Models\CommonResponse;
use App\ValidationFacade;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function updateAnswer(Request $request) {
        $input = ValidationFacade::validate($request->all(),[]);
        $answer= new AnswersModel();
        $answer->current_value = $input["current_choiсe"];
        $answer->question_id = $input["question_id"];
        $answer->save();
        // dd($question);

        return $answer;
    }
}
