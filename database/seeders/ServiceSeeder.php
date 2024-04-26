<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Service::truncate();

        Service::create([
            'id' => 1,
            'name' => 'Boxing',
            'description' => '',
        ]);

        Service::create([
            'id' => 2,
            'name' => 'Yoga',
            'description' => ''
        ]);

        Service::create([
            'id' => 3,
            'name' => 'Fitness Only',
            'description' => 'Use gym of equipments',
        ]);

        Service::create([
            'id' => 4,
            'name' => 'Muai Thai',
            'description' => ''
        ]);
    }
}
