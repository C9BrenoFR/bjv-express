<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PackageController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\DeliverMiddleware;
use App\Http\Middleware\OperatorMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
})->name('home');

Route::middleware(AdminMiddleware::class)->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Rotas de pacotes
    Route::get('admin/packages', [PackageController::class, 'index'])->name('admin.packages');
    Route::get('admin/packages/create', [PackageController::class, 'create'])->name('admin.packages.create');
    Route::post('admin/packages', [PackageController::class, 'store'])->name('admin.packages.store');
    Route::get('admin/packages/view/{package}', [PackageController::class, 'show'])->name('admin.packages.show');
    Route::get('admin/packages/edit/{package}', [PackageController::class, 'edit'])->name('admin.packages.edit');
    Route::put('admin/packages/{package}', [PackageController::class, 'update'])->name('admin.packages.update');
    Route::delete('admin/packages/{package}', [PackageController::class, 'destroy'])->name('admin.packages.destroy');

    // Rotas de funcionários
    Route::get('admin/employees', [EmployeeController::class, 'index'])->name('admin.employees');
    Route::get('admin/employees/create', [EmployeeController::class, 'create'])->name('admin.employees.create');
    Route::post('admin/employees', [EmployeeController::class, 'store'])->name('admin.employees.store');
    Route::get('admin/employees/view/{user}', [EmployeeController::class, 'show'])->name('admin.employees.show');
    Route::get('admin/employees/edit/{user}', [EmployeeController::class, 'edit'])->name('admin.employees.edit');
    Route::put('admin/employees/{user}', [EmployeeController::class, 'update'])->name('admin.employees.update');
    Route::delete('admin/employees/{user}', [EmployeeController::class, 'destroy'])->name('admin.employees.destroy');
});

Route::middleware(DeliverMiddleware::class)->group(function () {
    Route::get('/deliver', function () {
        echo "Logado como Entregador";
        return;
    })->name('dashboard.deliver');
});

Route::middleware(OperatorMiddleware::class)->group(function () {
    Route::get('/operator', function () {
        echo "Logado como operador";
        return;
    })->name('dashboard.operator');
});

Route::get('/test-auth', function () {
    dd(Auth::user());
})->middleware('web');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
