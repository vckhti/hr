<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    public static function saveOrder($data)
    {
        $order_id = DB::table('orders')->insertGetId([
            'user_id' => $data['user_id'],
            'note' => $data['note'],
            'total' => $data['cart_sum'],
            'qty' => $data['cart_qty']
        ]);
        self::saveOrderProduct($order_id, $data['orders']);
    }

    public static function saveOrderProduct($order_id, $orders)
    {

        foreach ($orders as $key => $product) {
            $sum = $product['qty'] * $product['price'];
            DB::table('order_product')->insert([
                'order_id' => $order_id,
                'product_id' => $product['product_id'],
                'title' => $product['title'],
                'slug' => $product['slug'],
                'price' => $product['price'],
                'product_qty' => $product['qty'],
                'sum' => $sum,
                'complete' => 0,
            ]);
        }
    }
}
