<?php

namespace Database\Seeders;

use App\Models\TicketType;
use Illuminate\Database\Seeder;

class TicketTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
    }
}
