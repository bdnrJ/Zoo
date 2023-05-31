<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\Item;
use App\Models\Service;
use App\Models\ServiceType;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionSeeder extends Seeder
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
            $transactionData = [
                'buy_date' => $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d h:m:s'),
                'exp_date' => $faker->dateTimeBetween('now', '+1 month')->format('Y-m-d h:m:s'),
                'user_id' => $faker->randomElement($usersIds),
                'total_cost' => $faker->randomFloat(2, 10, 1000),
                'type' => $faker->randomElement(['normal', 'group']),
            ];

            $transaction = Transaction::create($transactionData);

            $itemData = [
                'ticket_type_id' => $faker->numberBetween(1, 5),
                'amount' => $faker->numberBetween(1, 5),
            ];

            $item = new Item($itemData);
            $transaction->Items()->save($item);

            if ($transaction->type === 'group') {
                $serviceTypeIds = ServiceType::pluck('id')->toArray();
                $serviceData = [
                    'service_type_id' => $faker->randomElement($serviceTypeIds),
                ];

                $service = new Service($serviceData);
                $transaction->Services()->save($service);
            }
        }
    }
}
