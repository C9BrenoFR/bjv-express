<?php

namespace Database\Factories;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;
use PtbrFaker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = PtbrFaker::create();

        $address = Address::create([
            'country' => 'Brasil',
            'state' => $faker->state(),
            'city' => $faker->city(),
            'neighborhood' => PtbrFaker::GetNeighborhood(),
            'street' => $faker->streetName(),
            'number' => $faker->randomNumber(4, false),
            'complement' => '',
        ]);
        return [
            'title' => $faker->sentence(10),
            'address_id' => $address->id,
        ];
    }
}
