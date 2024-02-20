<?php

use App\Http\Controllers\Answers\AnswerController;
use App\Http\Controllers\Questions\QuestionsController;
use Illuminate\Http\Request;
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

Route::any('/get_questions', [QuestionsController::class, 'getQuestions']);
Route::post('/updateAnswer', [AnswerController::class, 'updateAnswer']);

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
