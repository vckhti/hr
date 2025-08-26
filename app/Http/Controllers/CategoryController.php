<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function categories() {
        $categories = DB::table('category')
            ->join('category_description','category.id','=','category_description.category_id')
            ->select('*')
            ->get();

        return response()->json($categories);
    }
}
