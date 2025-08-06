<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Delivery;
use App\Models\Package;
use App\Models\Unit;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Mode;
use Roles;
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
        $operators_info = [
            'registered' => User::where('role', Roles::OPERATOR)->count(),
            'actives' => User::where('role', Roles::OPERATOR)
                ->where('last_login', '>=', now()->subDays(30))
                ->count()
        ];

        $delivers_info = [
            'registered' => User::where('role', Roles::DELIVER)->count(),
            'actives' => User::where('role', Roles::DELIVER)
                ->where('last_login', '>=', now()->subDays(30))
                ->count()
        ];

        $packages_info = [
            'new' => Package::where('created_at', '>=', now()->subDays(30))->count(),
            'value' => Delivery::sum('value')
        ];

        $months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        $packagesByMonth = Package::selectRaw('MONTH(created_at) as month, COUNT(*) as packages')
            ->whereYear('created_at', now()->year)
            ->whereMonth('created_at', '<=', now()->month)
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('packages', 'month');

        $units_data = [];

        for ($index = 1; $index <= now()->month; $index++) {
            $units_data[] = [
                'month' => $months[$index - 1],
                'packages' => $packagesByMonth[$index] ?? 0
            ];
        }

        $states_data = \DB::table('units')
            ->join('addresses', 'units.address_id', '=', 'addresses.id')
            ->select('addresses.state as name', \DB::raw('COUNT(*) as units'))
            ->groupBy('addresses.state')
            ->orderBy('units', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->name,
                    'units' => $item->units
                ];
            })
            ->toArray();

        return Inertia::render('admin/dashboard', [
            'operators_info' => $operators_info,
            'total_units' => Unit::count(),
            'delivers_info' => $delivers_info,
            'packages_info' => $packages_info,
            'units_data' => $units_data,
            'states_data' => $states_data
        ]);
    }
}
