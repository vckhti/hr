<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\UsersModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function getAllOrders()
    {

        $products = DB::table('orders')
            ->join('order_product', 'orders.id', '=', 'order_product.order_id')
            ->select('*')
            ->get();

        return response()->json($products);


    }

    public function getOrderProductByProductId(Request $request)
    {
        $input = $request->validate([
            'id' => 'required|integer',
            'orderId' => 'required|integer'
        ]);

        $products = DB::table('order_product')
            ->select('*')
            ->where('order_product.product_id', '=', $input['id'])
            ->where('order_product.id', '=', $input['orderId'])
            ->first();

        return response()->json($products);

    }

    public function changeOrderStatus(Request $request)
    {
        $input = $request->validate([
            'id' => 'required|integer',
            'status' => 'required|integer',
        ]);


        DB::table('order_product')
            ->where('order_product.id', '=', $input['id'])
            ->update(['complete' => $input['status']]);

        return response()->json($input['status']);

    }


    public function getOrderById(Request $request)
    {
        $input = $request->validate([
            'id' => 'required|integer',
        ]);

        $order = DB::table('orders')
            ->select('*')
            ->where('orders.id', '=', $input['id'])
            ->first();

        return response()->json($order);

    }

    public function createOrder(Request $request)
    {
        $input = $request->validate([
            'user_id' => 'required|integer',
            'note' => 'required|string',
            'cart_sum' => 'required|integer',
            'cart_qty' => 'required|integer',
            'orders' => [
                'required',
                'array', // input must be an array
                'min:1'  // there must be three members in the array
            ],
        ]);

        $user = UsersModel::getCurrent();
        //dd($user);

        //return response()->json($input);

        Order::saveOrder($input);
    }
}
