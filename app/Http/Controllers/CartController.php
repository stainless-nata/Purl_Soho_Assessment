<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function add(Request $request)
    {
        $user = \JWTAuth::user();

        $cart = $user->cart;

        $productId = $request->input('product_id');

        $cartProduct = CartProduct::where('cart_id', $cart->id)->where('product_id', $productId)->first();

        if ($cartProduct) {
            $cartProduct->quantity += 1;
            $cartProduct->save();
        } else {
            $cartProduct = new CartProduct();
            $cartProduct->cart_id = $cart->id;
            $cartProduct->product_id = $productId;
            $cartProduct->quantity = 1;
            $cartProduct->save();
        }
        return response()->json(['message' => 'Product added to cart']);
    }

    public function get(Request $request)
    {
        $user = \JWTAuth::user();

        $products = $user->cart->products;

        // $products = $cart->products;

        return response()->json(['products' => $products]);
    }
}