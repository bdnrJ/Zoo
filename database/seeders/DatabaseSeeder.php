<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\GroupTicket;
use App\Models\NormalTicket;
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
            ],
            [
                'name' => 'Child',
                'age_info' => 'Age 3-18',
                'price' => 18.50,
                'is_active' => true,
            ],
            [
                'name' => 'Reduced',
                'age_info' => 'Age all',
                'price' => 15.50,
                'is_active' => false,
            ],
            [
                'name' => 'Senior Citizen',
                'age_info' => 'Age 60+',
                'price' => 12.30,
                'is_active' => true,
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
                'type' => $faker->randomElement(['normal', 'group']),
            ];

            $transaction = Transaction::create($transactionData);

            if ($transaction->type === 'normal') {
                $normalTicketsData = [];
                for ($j = 0; $j < $faker->numberBetween(1, 5); $j++) {
                    $normalTicketData = [
                        'ticket_type_id' => $faker->numberBetween(1,4),
                        'amount' => $faker->randomFloat(2, 5, 50),
                    ];
                    $normalTicketsData[] = $normalTicketData;
                }
                foreach ($normalTicketsData as $ticketData) {
                    $normalTicket = new NormalTicket($ticketData);
                    $transaction->NormalTickets()->save($normalTicket);
                }
            } else {
                $groupTicketData = [
                    'people' => $faker->numberBetween(10, 50),
                    "educational_materials" => $faker->boolean(),
                    "guided_tour" => $faker->boolean(),
                    "food_included" => $faker->boolean(),
                ];
                $groupTicket = new GroupTicket($groupTicketData);
                $transaction->GroupTickets()->save($groupTicket);
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
}
