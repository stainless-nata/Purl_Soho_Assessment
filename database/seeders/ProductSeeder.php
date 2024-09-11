<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'name' => 'glasses',
            'price' => 14,
        ]);
        Product::create([
            'name' => 'clothes',
            'price' => 15,
        ]);
        Product::create([
            'name' => 'trousers',
            'price' => 34,
        ]);
        Product::create([
            'name' => 'cup',
            'price' => 7,
        ]);
    }
}
