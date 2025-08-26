<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function products() {
        $products = DB::table('product')
            ->join('product_description','product.id','=','product_description.product_id')
            ->select('*')
            ->where('product_description.language_id' , '=', 1)
            ->get();

        //$array = json_decode(json_encode($), true);
        // dump($products);
        return response()->json($products);

    }

    public function products_by_category(Request $request) {
        $input = $request->validate([
            'id' => 'required|integer',
        ]);

        $products = DB::table('product')
            ->join('product_description','product.id','=','product_description.product_id')
            ->select('*')
            ->where('product_description.language_id' , '=', 1)
            ->where('product.category_id' , '=', $input['id'])
            ->get();

        return response()->json($products);

    }
}
