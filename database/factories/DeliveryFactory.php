<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Delivery;
use App\Models\History;
use App\Models\Package;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use PtbrFaker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Delivery>
 */
class DeliveryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = PtbrFaker::create();
        $unit_ids = Unit::get()->pluck("id")->toArray();
        $users_ids = User::get()->pluck("id")->toArray();
        $address = Address::create([
            'country' => 'Brasil',
            'state' => $faker->state(),
            'city' => $faker->city(),
            'neighborhood' => PtbrFaker::GetNeighborhood(),
            'street' => $faker->streetName(),
            'number' => $faker->randomNumber(4, false),
            'complement' => '',
        ]);

        $package = Package::create([
            'width' => $faker->randomFloat(2, 5, 100),
            'height' => $faker->randomFloat(2, 5, 100),
            'depth' => $faker->randomFloat(2, 5, 100),
            'weight' => $faker->randomFloat(2, 5, 60),
            'address_id' => $address->id,
        ]);
        return [
            'status' => '0',
            'package_id' => $package->id,
            'last_to_update' => $faker->randomElement($users_ids),
            'unit_id' => $faker->randomElement($unit_ids),
            'value' => $faker->randomFloat(2, 10, 200),
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Delivery $delivery) {
            History::create([
                'step' => 'Pacote esperando entregador',
                'mode' => '0',
                'delivery_id' => $delivery->id,
            ]);
        });
    }
}
