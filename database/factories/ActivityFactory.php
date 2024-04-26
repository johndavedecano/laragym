<?php

namespace Database\Factories;

use App\Constants;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cycle>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'entity_id' => User::factory(),
            'type' => Constants::ACTIVITY_ATTENDANCE,
            'description' => fake()->paragraph(1),
        ];
    }
}
