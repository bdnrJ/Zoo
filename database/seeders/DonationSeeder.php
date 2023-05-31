<?php

namespace Database\Seeders;

use App\Models\Donation;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DonationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $usersIds = DB::table('users')->pluck('id')->toArray();

        foreach($usersIds as $user){
            Donation::create([
                'donor_name' => null,
                'donor_email' => null,
                'user_id' => $faker->randomElement($usersIds),
                'amount' => rand(10, 1000),
                'donated_at' => now(),
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            Donation::create([
                'donor_name' => $faker->firstName . " " . $faker->lastName,
                'donor_email' => $faker->email,
                'user_id' => null,
                'amount' => rand(10, 1000),
                'donated_at' => now(),
            ]);
        }
    }
}
