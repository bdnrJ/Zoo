<?php

namespace Database\Seeders;

use App\Models\ServiceType;
use Illuminate\Database\Seeder;

class ServiceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
    }
}
