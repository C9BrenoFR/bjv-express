<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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
}
