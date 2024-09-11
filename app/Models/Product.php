<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function carts()
    {
        return $this->belongsToMany(Cart::class, 'cart_products')->withPivot('quantity');
    }

}