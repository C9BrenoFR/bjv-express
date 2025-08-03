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

    Route::get('admin/packages', [PackageController::class, 'index'])->name('admin.packages');

    Route::get('admin/employees', [EmployeeController::class, 'index'])->name('admin.employees');
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
