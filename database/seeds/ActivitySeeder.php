<?php

use Illuminate\Database\Seeder;
use App\Models\Activity;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Activity::truncate();

        factory(App\Models\Activity::class, 10)->create(['user_id' => 1]);
    }
}
