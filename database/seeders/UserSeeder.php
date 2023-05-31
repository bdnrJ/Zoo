<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $users = [];

        $users[] = [
            'firstname' => 'admin',
            'lastname' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('AdminAdmin'),
            'role' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ];

        $users[] = [
            'firstname' => 'user',
            'lastname' => 'user',
            'email' => 'user@user.com',
            'password' => Hash::make('UserUser'),
            'role' => 0,
            'created_at' => now(),
            'updated_at' => now()
        ];

        for ($i = 0; $i < 50; $i++) {
            $users[] = [
                'firstname' => $faker->firstName,
                'lastname' => $faker->lastName,
                'email' => $faker->unique()->email,
                'password' => Hash::make('password'),
                'role' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        DB::table('users')->insert($users);
    }
}
