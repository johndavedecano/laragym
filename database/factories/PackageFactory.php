<?php

namespace Database\Factories;

use App\Models\Cycle;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'cycle_id' => Cycle::factory(),
            'name' => fake()->name(),
            'status' => 'active',
            'amount' => fake()->numberBetween(1, 100)
        ];
    }
}
