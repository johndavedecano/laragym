<?php

use Illuminate\Database\Seeder;
use App\Models\Cycle;

class CycleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Cycle::truncate();

        Cycle::create([
            'id' => 1,
            'name' => 'Annually',
            'num_days' => 365,
            'description' => 'Customer pays yearly',
            'is_default' => true,
        ]);

        Cycle::create([
            'id' => 2,
            'name' => 'Monthly',
            'num_days' => 30,
            'description' => 'Customer pays every month',
            'is_default' => true,
        ]);

        Cycle::create([
            'id' => 3,
            'name' => 'Weekly',
            'num_days' => 7,
            'description' => 'Customer pays week',
            'is_default' => true,
        ]);

        Cycle::create([
            'id' => 4,
            'name' => 'Daily',
            'num_days' => 1,
            'description' => 'Everyday sales',
            'is_default' => true,
        ]);
    }
}
