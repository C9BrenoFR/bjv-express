<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UnitTest extends TestCase
{
    /**
     * Testa a criação de uma unidade.
     */
    public function test_can_create_unit(): void
    {
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'São Paulo',
            'city' => 'Campinas',
            'neighborhood' => 'Cambuí',
            'street' => 'Rua Criar',
            'number' => '100',
            'complement' => '',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade Central',
            'address_id' => $address->id,
        ]);

        $this->assertDatabaseHas('units', [
            'title' => 'Unidade Central',
            'address_id' => $address->id,
        ]);

        $this->assertEquals('Unidade Central', $unit->title);
    }

    /**
     * Testa a leitura de uma unidade.
     */
    public function test_can_read_unit(): void
    {
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'Rio Grande do Sul',
            'city' => 'Porto Alegre',
            'neighborhood' => 'Moinhos de Vento',
            'street' => 'Rua Ler',
            'number' => '200',
            'complement' => '',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade Sul',
            'address_id' => $address->id,
        ]);

        // Ler unidade do banco
        $foundUnit = Unit::find($unit->id);

        $this->assertNotNull($foundUnit);
        $this->assertEquals('Unidade Sul', $foundUnit->title);
        $this->assertEquals($address->id, $foundUnit->address_id);
    }

    /**
     * Testa a atualização de uma unidade.
     */
    public function test_can_update_unit(): void
    {
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'Santa Catarina',
            'city' => 'Florianópolis',
            'neighborhood' => 'Centro',
            'street' => 'Rua Atualizar',
            'number' => '300',
            'complement' => '',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade Original',
            'address_id' => $address->id,
        ]);

        // Atualizar unidade
        $unit->update([
            'title' => 'Unidade Atualizada',
        ]);

        $this->assertDatabaseHas('units', [
            'id' => $unit->id,
            'title' => 'Unidade Atualizada',
        ]);
    }

    /**
     * Testa a exclusão de uma unidade.
     */
    public function test_can_delete_unit(): void
    {
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'Goiás',
            'city' => 'Goiânia',
            'neighborhood' => 'Setor Bueno',
            'street' => 'Rua Deletar',
            'number' => '400',
            'complement' => '',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade Para Deletar',
            'address_id' => $address->id,
        ]);

        $unitId = $unit->id;

        // Deletar unidade
        $unit->delete();

        $this->assertSoftDeleted('units', [
            'id' => $unitId,
        ]);
    }

    /**
     * Testa o relacionamento entre unidade e endereço.
     */
    public function test_unit_belongs_to_address(): void
    {
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'Pernambuco',
            'city' => 'Recife',
            'neighborhood' => 'Boa Viagem',
            'street' => 'Rua Endereço',
            'number' => '500',
            'complement' => 'Sala 1',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade Nordeste',
            'address_id' => $address->id,
        ]);

        // Verificar relacionamento
        $this->assertNotNull($unit->address);
        $this->assertEquals('Recife', $unit->address->city);
        $this->assertEquals('Pernambuco', $unit->address->state);
    }

    /**
     * Testa o relacionamento entre unidade e usuários.
     */
    public function test_unit_has_many_users(): void
    {
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'Ceará',
            'city' => 'Fortaleza',
            'neighborhood' => 'Aldeota',
            'street' => 'Rua Usuários',
            'number' => '600',
            'complement' => '',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade com Usuários',
            'address_id' => $address->id,
        ]);

        // Criar usuários na unidade
        User::create([
            'name' => 'Funcionário 1',
            'email' => 'func1.' . uniqid() . '@teste.com',
            'password' => Hash::make('password123'),
            'role' => '1',
            'unit_id' => $unit->id,
        ]);

        User::create([
            'name' => 'Funcionário 2',
            'email' => 'func2.' . uniqid() . '@teste.com',
            'password' => Hash::make('password123'),
            'role' => '2',
            'unit_id' => $unit->id,
        ]);

        // Recarregar a unidade com relacionamentos
        $unit->load('users');

        $this->assertCount(2, $unit->users);
    }
}
