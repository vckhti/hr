<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\AnswersModel;
use App\Models\CommonData;
use App\Models\Questions\QuestionsModel;
use App\Models\TestsModel;
use App\Models\UsersModel;
use App\ValidationFacade;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function getTestResults() {
       // $input = ValidationFacade::validate($request->all(),[]);

        $test = new TestsModel();

        return response()->json($test->get(),200);
    }




    public function finishTest(Request $request) {
        $input = ValidationFacade::validate($request->all(),[]);
        $test = new TestsModel();

        $user = UsersModel::getCurrent();

        $test->user_id = $user->id;
        $test->subject_metter_ids = $input["subject_metter_id"];
        $test->testing_times = $input["testing_times"];


        $questions = DB::table('questions')
            ->where('id' ,'>', 0)->get();

        $questions_count = $input["questions_count"];
        $right_questions = 0;

        for ($i = 1; $i <= $questions_count; $i++) {
            $answer = DB::table('answers')
                ->where('user_id', $user->id)
                ->where('question_id', $i)
                ->where('current_value','!=', null)
                ->latest('created_at')
                ->first() ?? null;

            if (!empty($answer) && ($questions[$i-1]->id === $answer->question_id) && ($questions[$i-1]->right_variant == $answer->current_value)) {
                $right_questions = $right_questions + 1;
            }
        }

        $change_answer_ids = '';
        $doubles =DB::table('answers')
            ->select(DB::raw('COUNT(*) as count,question_id'))
            ->where('user_id',  $user->id)
            ->where('current_value','!=', null)
            ->where('question_id', '>', 0)
            ->where('question_id', '<', $questions_count+1)
            ->groupBy('question_id')
            ->get();

        foreach($doubles as $item) {
            if ($item->count > 1) {
                $change_answer_ids=$change_answer_ids.$item->question_id.', ';
            }
        }

        $thinkingTime = DB::table('answers')
                ->select(DB::raw('id,question_id,thinking_time,user_id'))
                ->where('user_id',  $user->id)
                ->orderBy('question_id')
                ->get();


        $current_question_id = null;
        foreach($thinkingTime as $key => &$item) {
            if (empty($current_question_id)) {
                $current_question_id = $item->question_id;
            } else if (!empty($current_question_id) && $current_question_id === $item->question_id){
                $current_question_id = $item->question_id;
                $item->thinking_time = $item->thinking_time + $thinkingTime[$key-1]->thinking_time;
                unset($thinkingTime[$key-1]);
            } else {
                $current_question_id = $item->question_id;
            }
        }

        $all_user_answers = DB::table('answers')
            ->select(DB::raw('id,question_id,thinking_time,user_id'))
            ->where('user_id',  $user->id)
            ->orderBy('created_at')
            ->get();

        $history_ids = '';
        $current_item = null;
        foreach($all_user_answers as $var) {
            if ($current_item !== $var->question_id) {
                $current_item = $var->question_id;
                $history_ids= $history_ids.$var->question_id.', ';
            }
        }

        $answer_times_ids = '';
        foreach($thinkingTime->sortByDesc('thinking_time') as $item) {
            $answer_times_ids= $answer_times_ids.$item->question_id.'-('.round((($item->thinking_time/10000)*3.925),1).' сек), ';
        }
        //dd($thinkingTime->sortByDesc('thinking_time'));


        DB::table('tests')->insert([
            'created_at' =>  Carbon::now(),
            'updated_at' => Carbon::now(),
            'subject_metter_ids' => $input["subject_metter_id"],
            'user_id' => $user->id,
            'questions_count' => $questions_count,
            'questions_ids' => $change_answer_ids,
            'right_questions' => $right_questions,
            'wrong_questions' => ($questions_count - $right_questions),
            'testing_times' => $input["testing_times"],
            'testing_max_time' => (20 * 60),
            'comeback_ids' => $input["comeback_ids"],
            'history_ids' => $history_ids,
            'answer_times_ids' => $answer_times_ids,
        ]);

        return response()->json([
            'questions_count' => $questions_count,
            'right_questions' => $right_questions,
            'wrong_questions' => ($questions_count - $right_questions),
            'testing_times' => $input["testing_times"],
        ], 200);

    }
}
