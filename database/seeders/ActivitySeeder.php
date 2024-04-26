<?php
namespace Database\Seeders;

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

        foreach (range(0, 10) as $key) {
            Activity::create([
                'entity_id' => 1,
                'type' => \App\Constants::ACTIVITY_ATTENDANCE,
                'description' => 'login'
            ]);
        }
    }
}
