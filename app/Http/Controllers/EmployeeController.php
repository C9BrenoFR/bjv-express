<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Roles;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = User::where('role', '!=', Roles::ADMIN)->paginate(5);

        $employees->getCollection()->each(function (User $employee) {
            $employee->role = Roles::translate($employee->role);
        });

        return Inertia::render('admin/employees', [
            'employees' => $employees->items(), // Pega apenas os dados dos pacotes
            'pagination' => [
                'current_page' => $employees->currentPage(),
                'total' => $employees->total(),
                'per_page' => $employees->perPage(),
                'last_page' => $employees->lastPage(),
            ]
        ]);
    }

    public function create()
    {
        $units = Unit::all();

        return Inertia::render('admin/employees/create', [
            'units' => $units
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:0,1,2',
            'unit_id' => 'required|exists:units,id',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'unit_id' => $validated['unit_id'],
        ]);

        return redirect()->route('admin.employees')->with('success', 'Funcionário criado com sucesso!');
    }

    public function show(User $user)
    {
        $user->load('unit');
        $user->role = Roles::translate($user->role);

        return Inertia::render('admin/employees/show', [
            'employee' => $user
        ]);
    }

    public function edit(User $user)
    {
        $user->load('unit');
        $units = Unit::all();

        return Inertia::render('admin/employees/edit', [
            'employee' => $user,
            'units' => $units
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|in:0,1,2',
            'unit_id' => 'required|exists:units,id',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'unit_id' => $validated['unit_id'],
        ];

        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        return redirect()->route('admin.employees')->with('success', 'Funcionário atualizado com sucesso!');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.employees')->with('success', 'Funcionário deletado com sucesso!');
    }
}
