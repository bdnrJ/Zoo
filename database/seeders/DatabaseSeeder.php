<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Item;
use App\Models\Service;
use App\Models\ServiceType;
use App\Models\TicketType;
use App\Models\Transaction;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $faker = Faker::create();
        $users = [];

        $users[] = [
            'firstname' => 'admin',
            'lastname' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('AdminAdmin'),
            'role' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ];

        $users[] = [
            'firstname' => 'user',
            'lastname' => 'user',
            'email' => 'user@user.com',
            'password' => bcrypt('UserUser'),
            'role' => 0,
            'created_at' => now(),
            'updated_at' => now()
        ];

        for ($i = 0; $i < 50; $i++) {
            $users[] = [
                'firstname' => $faker->firstName,
                'lastname' => $faker->lastName,
                'email' => $faker->unique()->email,
                'password' => bcrypt('password'),
                'role' => 0,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        DB::table('users')->insert($users);

        $ticketTypes = [
            [
                'name' => 'Adult',
                'age_info' => 'Age 18-60',
                'price' => 21.37,
                'is_active' => true,
                'type' => 'normal'
            ],
            [
                'name' => 'Child',
                'age_info' => 'Age 3-18',
                'price' => 18.50,
                'is_active' => true,
                'type' => 'normal'
            ],
            [
                'name' => 'Reduced',
                'age_info' => 'Age all',
                'price' => 15.50,
                'is_active' => false,
                'type' => 'normal'
            ],
            [
                'name' => 'Senior Citizen',
                'age_info' => 'Age 60+',
                'price' => 12.30,
                'is_active' => true,
                'type' => 'normal'
            ],
            [
                'name' => 'SingleGroupTicket',
                'age_info' => '-',
                'price' => 20.30,
                'is_active' => true,
                'type' => 'group'
            ],
        ];

        foreach ($ticketTypes as $ticketTypeData) {
            $ticketType = new TicketType($ticketTypeData);
            $ticketType->save();
        }

        $serviceTypes = [
            [
                'name' => 'Food and Refreshments',
                'description' => 'Enjoy a variety of food options, from quick snacks to full meals, and refresh yourself with a wide range of drinks.',
                'price_per_customer' => 10.00,
                'is_active' => true,
            ],
            [
                'name' => 'Guided Tour',
                'description' => 'Get the most out of your visit with a guided tour. Our knowledgeable guides will take you through the zoo, share interesting facts, and answer your questions.',
                'price_per_customer' => 2.00,
                'is_active' => true,
            ],
            [
                'name' => 'Animal Interaction Experience',
                'description' => 'Get up close with some of our friendly animals. This unique experience includes feeding and petting select animals under the guidance of our zookeepers.',
                'price_per_customer' => 1.00,
                'is_active' => true,
            ],
            [
                'name' => 'Zoo Explorer Package',
                'description' => 'Enhance your zoo adventure with our explorer package. This includes a map of the zoo, a hat, a water bottle, and a souvenir badge.',
                'price_per_customer' => 2.00,
                'is_active' => false,
            ],
        ];
        foreach ($serviceTypes as $serviceTypeData) {
            $serviceType = new ServiceType($serviceTypeData);
            $serviceType->save();
        }

        $transactionData = [];

        $usersIds = DB::table('users')->pluck('id')->toArray();

        for ($i = 0; $i < 25; $i++) {
            $transactionData = [
                'buy_date' => $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d h:m:s'),
                'exp_date' => $faker->dateTimeBetween('now', '+1 month')->format('Y-m-d h:m:s'),
                'user_id' => $faker->randomElement($usersIds),
                'total_cost' => $faker->randomFloat(2, 10, 1000),
                'type' => 'normal'
            ];

            $transaction = Transaction::create($transactionData);

            $itemsData = [];
            for ($j = 0; $j < $faker->numberBetween(1, 5); $j++) {
                $itemData = [
                    'ticket_type_id' => $faker->numberBetween(1, 4),
                    'amount' => $faker->numberBetween(1, 5),
                ];
                $itemsData[] = $itemData;
            }
            foreach ($itemsData as $itemData) {
                $item = new Item($itemData);
                $transaction->Items()->save($item);
            }
        }

        for ($i = 0; $i < 25; $i++) {
            $transactionData = [
                'buy_date' => $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d h:m:s'),
                'exp_date' => $faker->dateTimeBetween('now', '+1 month')->format('Y-m-d h:m:s'),
                'user_id' => $faker->randomElement($usersIds),
                'total_cost' => $faker->randomFloat(2, 10, 1000),
                'type' => 'group'
            ];

            $transaction = Transaction::create($transactionData);

            $itemData = [
                'ticket_type_id' => 5,
                'amount' => $faker->numberBetween(10, 50),
            ];

            $item = new Item($itemData);
            $transaction->Items()->save($item);
        }

        for ($i = 0; $i < 25; $i++) {
            $transactionData = [
                'buy_date' => $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d h:m:s'),
                'exp_date' => $faker->dateTimeBetween('now', '+1 month')->format('Y-m-d h:m:s'),
                'user_id' => $faker->randomElement($usersIds),
                'total_cost' => $faker->randomFloat(2, 10, 1000),
                'type' => 'group'
            ];

            $transaction = Transaction::create($transactionData);

            $itemData = [
                'ticket_type_id' => 5,
                'amount' => $faker->numberBetween(10, 50),
            ];

            $item = new Item($itemData);
            $transaction->Items()->save($item);

            // Assign random services to group transactions
            $serviceTypeIds = ServiceType::pluck('id')->toArray();
            for ($j = 0; $j < $faker->numberBetween(1, 2); $j++) {
                $serviceData = [
                    'transaction_id' => $transaction->id,
                    'service_type_id' => $faker->randomElement($serviceTypeIds),
                ];
                $service = new Service($serviceData);
                $service->save();
            }
        }
    }
}
