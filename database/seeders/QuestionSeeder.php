<?php

namespace Database\Seeders;

use App\Models\Questions\QuestionsModel;
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

        QuestionsModel::factory()->count(20)->create();
    }
}
