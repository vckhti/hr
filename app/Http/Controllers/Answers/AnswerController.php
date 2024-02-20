<?php

namespace App\Http\Controllers\Answers;

use App\Http\Controllers\Controller;
use App\Models\CommonResponse;
use App\ValidationFacade;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function updateAnswer(Request $request) {
        $input = ValidationFacade::validate($request->all(),[]);
        dd($input);
    }
}
