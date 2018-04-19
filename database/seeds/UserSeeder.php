<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
            'password' => Hash::make('password')
        ]);

        factory(App\Models\User::class, 10)->create(['is_admin' => false]);
    }
}
