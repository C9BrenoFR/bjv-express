<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    /**
     * Testa a criação de um funcionário.
     */
    public function test_can_create_employee(): void
    {
        // Criar uma unidade primeiro
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'São Paulo',
            'city' => 'São Paulo',
            'neighborhood' => 'Centro',
            'street' => 'Rua Teste',
            'number' => '123',
            'complement' => '',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade Teste',
            'address_id' => $address->id,
        ]);

        // Criar funcionário
        $employee = User::create([
            'name' => 'João Silva',
            'email' => 'joao.silva.' . uniqid() . '@teste.com',
            'password' => Hash::make('password123'),
            'role' => '1',
            'unit_id' => $unit->id,
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'João Silva',
            'role' => '1',
        ]);

        $this->assertEquals('João Silva', $employee->name);
        $this->assertEquals($unit->id, $employee->unit_id);
    }

    /**
     * Testa a leitura de um funcionário.
     */
    public function test_can_read_employee(): void
    {
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'Rio de Janeiro',
            'city' => 'Rio de Janeiro',
            'neighborhood' => 'Copacabana',
            'street' => 'Rua Leitura',
            'number' => '456',
            'complement' => '',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade Leitura',
            'address_id' => $address->id,
        ]);

        $email = 'maria.santos.' . uniqid() . '@teste.com';
        $employee = User::create([
            'name' => 'Maria Santos',
            'email' => $email,
            'password' => Hash::make('password123'),
            'role' => '2',
            'unit_id' => $unit->id,
        ]);

        // Ler funcionário do banco
        $foundEmployee = User::find($employee->id);

        $this->assertNotNull($foundEmployee);
        $this->assertEquals('Maria Santos', $foundEmployee->name);
        $this->assertEquals($email, $foundEmployee->email);
        $this->assertEquals('2', $foundEmployee->role);
    }

    /**
     * Testa a atualização de um funcionário.
     */
    public function test_can_update_employee(): void
    {
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'Minas Gerais',
            'city' => 'Belo Horizonte',
            'neighborhood' => 'Savassi',
            'street' => 'Rua Update',
            'number' => '789',
            'complement' => '',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade Update',
            'address_id' => $address->id,
        ]);

        $employee = User::create([
            'name' => 'Pedro Oliveira',
            'email' => 'pedro.oliveira.' . uniqid() . '@teste.com',
            'password' => Hash::make('password123'),
            'role' => '1',
            'unit_id' => $unit->id,
        ]);

        $newEmail = 'pedro.silva.' . uniqid() . '@teste.com';
        // Atualizar funcionário
        $employee->update([
            'name' => 'Pedro Oliveira Silva',
            'email' => $newEmail,
            'role' => '2',
        ]);

        $this->assertDatabaseHas('users', [
            'id' => $employee->id,
            'name' => 'Pedro Oliveira Silva',
            'email' => $newEmail,
            'role' => '2',
        ]);
    }

    /**
     * Testa a exclusão de um funcionário.
     */
    public function test_can_delete_employee(): void
    {
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'Bahia',
            'city' => 'Salvador',
            'neighborhood' => 'Barra',
            'street' => 'Rua Delete',
            'number' => '321',
            'complement' => '',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade Delete',
            'address_id' => $address->id,
        ]);

        $employee = User::create([
            'name' => 'Ana Costa',
            'email' => 'ana.costa.delete.' . uniqid() . '@teste.com',
            'password' => Hash::make('password123'),
            'role' => '1',
            'unit_id' => $unit->id,
        ]);

        $employeeId = $employee->id;

        // Deletar funcionário
        $employee->delete();

        $this->assertSoftDeleted('users', [
            'id' => $employeeId,
        ]);
    }

    /**
     * Testa o relacionamento entre funcionário e unidade.
     */
    public function test_employee_belongs_to_unit(): void
    {
        $address = Address::create([
            'country' => 'Brasil',
            'state' => 'Paraná',
            'city' => 'Curitiba',
            'neighborhood' => 'Centro',
            'street' => 'Rua Relação',
            'number' => '555',
            'complement' => '',
        ]);

        $unit = Unit::create([
            'title' => 'Unidade Relação',
            'address_id' => $address->id,
        ]);

        $employee = User::create([
            'name' => 'Carlos Mendes',
            'email' => 'carlos.mendes.' . uniqid() . '@teste.com',
            'password' => Hash::make('password123'),
            'role' => '2',
            'unit_id' => $unit->id,
        ]);

        // Verificar relacionamento
        $this->assertNotNull($employee->unit);
        $this->assertEquals('Unidade Relação', $employee->unit->title);
    }
}
