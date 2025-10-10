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
Route::post('/login2', [UsersController::class,'login2']);
Route::get('/get_users_names', [UsersController::class,'getNames']);

Route::any('/get_questions', [QuestionsController::class, 'getQuestions']);
Route::any('/get_question_by_id', [QuestionsController::class, 'getQuestionById']);

Route::post('/updateAnswer', [AnswerController::class, 'updateAnswer']);
Route::post('/get_answers_by_question_id', [AnswerController::class, 'getAnswersByQuestionId']);

Route::post('/finishTest', [TestController::class, 'finishTest']);
Route::get('/get_test_results', [TestController::class, 'getTestResults']);


Route::get('tors', [MenuController::class, 'getMenuItems']);

Route::get('products', 'App\Http\Controllers\ProductController@products');

Route::post('products_by_category', 'App\Http\Controllers\ProductController@products_by_category');

Route::get('categories', 'App\Http\Controllers\CategoryController@categories');


Route::get('users_descriptions', 'App\Http\Controllers\Users\UsersController@usersDescriptions');

Route::post('users_by_id', 'App\Http\Controllers\Users\UsersController@usersById');

Route::get('orders', 'App\Http\Controllers\OrderController@getAllOrders');

Route::post('order_product_by_id', 'App\Http\Controllers\OrderController@getOrderProductByProductId');

Route::post('create_order', 'App\Http\Controllers\OrderController@createOrder');

Route::post('order_by_id', 'App\Http\Controllers\OrderController@getOrderById');

Route::any('logout', [UsersController::class, 'logout']);

Route::post('change_order_status', 'App\Http\Controllers\OrderController@changeOrderStatus');



//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
