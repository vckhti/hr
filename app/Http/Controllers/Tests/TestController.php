<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\TestsModel;
use App\Models\UsersModel;
use App\ValidationFacade;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function finishTest(Request $request) {
        $input = ValidationFacade::validate($request->all(),[]);

        $test = new TestsModel();

        $test->user_id = UsersModel::getCurrent()->id;

    }
}
