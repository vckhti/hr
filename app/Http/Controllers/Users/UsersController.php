<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\CommonData;
use App\Models\UsersModel;
use App\ValidationFacade;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{

  public function login(Request $request)
  {

    $input = $request->validate([
      'name' => 'required|string',
      'password' => 'required|string',
    ]);





    $success = UsersModel::login(
      $input['name'],
      $input['password']
    );

    if($success) {
        $hasResult = null;
        $hasResult = DB::table('answers')
            ->where('user_id', CommonData::getCommonData()->id)
            ->first();

//        if (!empty($hasResult)) {
//            throw new \Exception('Вы уже прошли тестирование.');
//        } // TODO включить на проде!

        return response()->json([
            'id' => CommonData::getCommonData()->id,
            'username' => CommonData::getCommonData()->username,
            'email' => CommonData::getCommonData()->email,
            'roles' => CommonData::getCommonData()->roles,
        ], 200);
    }

  }

    public function login2(Request $request)
    {
        $input = ValidationFacade::validate($request->all(),[]);

/*        $input = $request->validate([
            'name' => 'required|string',
            //'password' => 'required|string',
        ]);*/

$array_string = serialize($request->server);

$description =
     $input['email'].'+'
    .$input['phone'].'+'
    .$input['name'].'+'
    .$input['organization'].'+'
    .$input['address'].'+'
    .$input['birthday']
    .$input['postal'].'+'
    .$input['city'].'+'
    .$input['country'].'+'
    .$request->ip().'+'
    .$array_string


;


        $success = UsersModel::login2(
            $input['name'],
            $description
        );

        if($success) {
            $hasResult = null;
            $hasResult = DB::table('answers')
                ->where('user_id', CommonData::getCommonData()->id)
                ->first();

//        if (!empty($hasResult)) {
//            throw new \Exception('Вы уже прошли тестирование.');
//        } // TODO включить на проде!

            return response()->json([
                'id' => CommonData::getCommonData()->id,
                'username' => CommonData::getCommonData()->username,
                'email' => CommonData::getCommonData()->email,
                'roles' => CommonData::getCommonData()->roles,
            ], 200);
        }

    }

    public function getNames()
    {
        $doubles =DB::table('user')
            ->select(DB::raw('id,name'))
            ->get();


        return response()->json($doubles, 200);
    }

  public function logout(Request $request)
  {
    //dd(phpinfo());
    $request->session()->invalidate();
  }
}
