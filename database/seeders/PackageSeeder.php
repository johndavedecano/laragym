<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Package;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Package::truncate();

        for ($i = 1; $i < 4; $i++) {
            Package::create([
                'cycle_id' => 1,
                'amount' => 10 + $i * 1,
                'name' => 'Package1' . $i,
            ])->services()->attach([1, 2, 3, 4]);

            Package::create([
                'cycle_id' => 2,
                'amount' => 10 + $i * 2,
            ])->services()->attach([1, 2, 3, 4]);

            Package::create([
                'cycle_id' => 3,
                'amount' => 10 + $i * 3,
                'name' => 'Package1' . $i,
            ])->services()->attach([1, 2, 3, 4]);

            Package::create([
                'cycle_id' => 4,
                'amount' => 10 + $i * 4,
                'name' => 'Package1' . $i,
            ])->services()->attach([1, 2, 3, 4]);
        }
    }
}
