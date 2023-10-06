<?php

namespace Database\Seeders;

use Illuminate\Container\Container;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Generator;

class QuestionSeeder extends Seeder
{
    protected $faker;

    public function __construct()
    {
        $this->faker = $this->withFaker();
    }

    protected function withFaker()
    {
        return Container::getInstance()->make(Generator::class);
    }


    public function run()
    {

        DB::table('questions')->insert([
        'variant1' => $this->faker->sentence(12),
        'variant2' => $this->faker->sentence(12),
        'variant3' => $this->faker->sentence(12),
        'variant4' => $this->faker->sentence(12),
        'variant5' => $this->faker->sentence(12),
        'variant6' => $this->faker->sentence(12),
        'execution_time' => $this->faker->unixTime(),
        'right_variant' => $this->faker->sentence(12),
        'history' => $this->faker->sentence(3),
        ]);
    }
}
