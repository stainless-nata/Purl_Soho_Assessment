<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Product::where('price', '>', 10)
            ->orderBy('price', 'asc')
            ->get(['id', 'name', 'price']);
        return response()->json(['products' => $products]);
    }
}
