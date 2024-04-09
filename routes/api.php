<?php

use App\Http\Controllers\Answers\AnswerController;
use App\Http\Controllers\Questions\QuestionsController;
use App\Http\Controllers\Tests\TestController;
use App\Http\Controllers\Users\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login', [UsersController::class,'login']);
Route::get('/get_users_names', [UsersController::class,'getNames']);

Route::any('/get_questions', [QuestionsController::class, 'getQuestions']);
Route::any('/get_question_by_id', [QuestionsController::class, 'getQuestionById']);

Route::post('/updateAnswer', [AnswerController::class, 'updateAnswer']);
Route::post('/get_answers_by_question_id', [AnswerController::class, 'getAnswersByQuestionId']);

Route::post('/finishTest', [TestController::class, 'finishTest']);
Route::get('/get_test_results', [TestController::class, 'getTestResults']);


//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
