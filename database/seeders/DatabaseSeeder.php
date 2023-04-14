<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Item;
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
            // Add more ticket types here as needed
        ];

        foreach ($ticketTypes as $ticketTypeData) {
            $ticketType = new TicketType($ticketTypeData);
            $ticketType->save();
        }

        $transactionData = [];

        $usersIds = DB::table('users')->pluck('id')->toArray();

        for ($i = 0; $i < 50; $i++) {
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
                    'ticket_type_id' => $faker->numberBetween(1,4),
                    'amount' => $faker->numberBetween(1,5),
                ];
                $itemsData[] = $itemData;
            }
            foreach ($itemsData as $itemData) {
                $item = new Item($itemData);
                $transaction->Items()->save($item);
            }
        }
        }
        //normal transaction
        // {
        //     "buy_date": "2023-04-05T00:00:00",
        //     "exp_date": "2023-04-06T00:00:00",
        //     "total_cost": 10.0,
        //     "type": "normal",
        //     "normal_tickets": [
        //       {
        //         "ticket_type_id": 1,
        //         "amount": 3
        //       },
        //       {
        //         "ticket_type_id": 2,
        //         "amount": 4
        //       }
        //     ]
        //   }

        //group transaction
        // {
        //     "buy_date": "2023-04-09",
        //     "exp_date": "2023-04-15",
        //     "total_cost": 200,
        //     "type": "group",
        //     "group_ticket": {
        //         "people": 30,
        //         "educational_materials": true,
        //         "guided_tour": false,
        //         "food_included": true
        //     }
        // }

    }
