<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        User::create([
            'id' => 1,
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'is_admin' => true,
            'password' => bcrypt('password')
        ]);


        User::factory()->create(['is_admin' => false]);
    }
}
