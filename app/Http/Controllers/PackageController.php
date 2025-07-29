<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Status;

class PackageController extends Controller
{
    public function index()
    {
        $packages = Package::with('address')
            ->leftJoin('deliveries', 'packages.id', '=', 'deliveries.package_id')
            ->select(
                'packages.*',
                'deliveries.id as code',
                'deliveries.status as status',
            )
            ->paginate(5);

        $packages->getCollection()->transform(function (Package $package) {
            $package->formatted_address = $package->address?->print(Address::STREET_MAIN_INFORMATION) ?? 'Endereço não encontrado';
            if ($package->status == Status::IN_SEPARATION)
                $package->status = "Em separação";
            else if ($package->status == Status::ON_WAY)
                $package->status = "A caminho";
            else if ($package->status == Status::DELIVERED)
                $package->status = "Entregue";
            return $package;
        });

        return Inertia::render('admin/packages', [
            'packages' => $packages->items(), // Pega apenas os dados dos pacotes
            'pagination' => [
                'current_page' => $packages->currentPage(),
                'total' => $packages->total(),
                'per_page' => $packages->perPage(),
                'last_page' => $packages->lastPage(),
            ]
        ]);
    }
}
