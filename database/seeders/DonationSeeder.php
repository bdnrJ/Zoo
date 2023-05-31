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

        for ($i = 0; $i < 50; $i++) {
            $donationData = [
                'donation_date' => $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d h:m:s'),
                'user_id' => $faker->randomElement($usersIds),
                'amount' => $faker->randomFloat(2, 10, 1000),
                'is_anonymous' => $faker->boolean,
            ];

            $donation = new Donation($donationData);
            $donation->save();
        }
    }
}
