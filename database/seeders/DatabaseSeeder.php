<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $seeder = new UserSeeder();
        $seeder->run();
        $seeder = new CartSeeder();
        $seeder->run();
        $seeder = new ProductSeeder();
        $seeder->run();
    }
}
