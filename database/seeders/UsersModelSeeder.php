<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user')->insert([
            'email' => 'user@mail.ru',
            'name' => 'user',
            'address' => 'test address',
            'password' => '123456',
            'role' => 'user',
        ]);

        DB::table('user')->insert([
            'email' => 'marimonov@mail.ru',
            'name' => 'marimonov',
            'address' => 'Abakan',
            'password' => '123456789',
            'role' => 'admin',
        ]);
    }
}
