<?php

namespace Database\Factories;

use App\Models\Questions\QuestionsModel;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionsFactory extends Factory
{
    /**
     * Название модели, соответствующей фабрике.
     *
     * @var string
     */
    protected $model = QuestionsModel::class;

    /**
     * Define the models's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'question' => $this->faker->sentence(12),
            'variant1' => $this->faker->sentence(12),
            'variant2' => $this->faker->sentence(12),
            'variant3' => $this->faker->sentence(12),
            'variant4' => $this->faker->sentence(12),
            'variant5' => $this->faker->sentence(12),
            'variant6' => $this->faker->sentence(12),
            //'execution_time' => $this->faker->unixTime(),
            'right_variant' => rand(1, 6),
            //'history' => $this->faker->sentence(3),
        ];
    }
}
