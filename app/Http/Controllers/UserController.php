<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Package;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Mode;
use Status;

class UserController extends Controller
{
    public function operatorDashboard(Request $request)
    {
        $unit = Auth::user()->unit;
        $query = Package::with('address')
            ->leftJoin('deliveries', 'packages.id', '=', 'deliveries.package_id')
            ->select(
                'packages.*',
                'deliveries.id as code',
                'deliveries.status as status',
                'deliveries.unit_id as unit_id',
            )
            ->where([
                ['unit_id', '=', $unit->id],
                ['mode', '=', Mode::IN_UNIT],
            ]);

        // Apply search filter if provided
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('deliveries.id', 'like', "%{$searchTerm}%")
                    ->orWhereHas('address', function ($addressQuery) use ($searchTerm) {
                        $addressQuery->where('city', 'like', "%{$searchTerm}%")
                            ->orWhere('state', 'like', "%{$searchTerm}%")
                            ->orWhere('street', 'like', "%{$searchTerm}%")
                            ->orWhere('zip_code', 'like', "%{$searchTerm}%");
                    });
            });
        }

        $packages = $query->paginate(5)->appends($request->query());

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

        return Inertia::render('operator/dashboard', [
            'packages' => $packages->items(),
            'pagination' => [
                'current_page' => $packages->currentPage(),
                'total' => $packages->total(),
                'per_page' => $packages->perPage(),
                'last_page' => $packages->lastPage(),
            ],
            'search' => $request->search ?? ''
        ]);
    }

    public function adminDashboard()
    {
        return Inertia::render('admin/dashboard', [
            'operators_info' => [
                'registered' => 1200,
                'actives' => 800
            ],

            'delivers_info' => [
                'registered' => 1200,
                'actives' => 800
            ],

            'packages_info' => [
                'new' => 2000,
                'value' => 9000
            ],

            'units_data' => [
                [
                    'month' => 'Jan',
                    'packages' => 300,
                ],
                [
                    'month' => 'Fev',
                    'packages' => 300,
                ],
                [
                    'month' => 'Mar',
                    'packages' => 300,
                ],
                [
                    'month' => 'Abr',
                    'packages' => 300,
                ],
            ],
            'states_data' => [
                [
                    'name' => 'São Paulo',
                    'units' => 12,
                ],
                [
                    'name' => 'São Paulo',
                    'units' => 12,
                ],
                [
                    'name' => 'São Paulo',
                    'units' => 12,
                ],
            ]
        ]);
    }
}
