<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    protected $table = "product";

    public $timestamps = false;

    protected $fillable = [
        'id',
        'category_id',
        'slug',
        'price',
        'old_price',
        'status',
        'hit',
        'img'
    ];

    use HasFactory;
}
