<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\Models\Unit;
use App\Models\Package;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Mode;
use Status;
use Roles;

class DeliveryController extends Controller
{
    public function index()
    {
        $units = Unit::with('address')->get();

        return Inertia::render('deliver/index', [
            'units' => $units
        ]);
    }

    public function dashboard(Request $request, Unit $unit)
    {
        $query = Package::with(['address', 'deliver.lastToUpdate'])
            ->leftJoin('deliveries', 'packages.id', '=', 'deliveries.package_id')
            ->leftJoin('users', 'deliveries.last_to_update', '=', 'users.id')
            ->select(
                'packages.*',
                'deliveries.id as code',
                'deliveries.status as status',
                'deliveries.unit_id as unit_id',
                'deliveries.last_to_update as last_to_update'
            )
            ->where([
                ['deliveries.unit_id', '=', $unit->id],
                ['mode', '=', Mode::IN_UNIT]
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
            $package->formatted_address = $package->address?->print(\App\Models\Address::STREET_MAIN_INFORMATION) ?? 'Endereço não encontrado';
            if ($package->status == Status::IN_SEPARATION)
                $package->status = "Em separação";
            else if ($package->status == Status::ON_WAY)
                $package->status = "A caminho";
            else if ($package->status == Status::DELIVERED)
                $package->status = "Entregue";
            return $package;
        });

        return Inertia::render('deliver/dashboard', [
            'packages' => $packages->items(),
            'pagination' => [
                'current_page' => $packages->currentPage(),
                'total' => $packages->total(),
                'per_page' => $packages->perPage(),
                'last_page' => $packages->lastPage(),
            ],
            'search' => $request->search ?? '',
            'unit' => $unit
        ]);
    }

    public function collect(Request $request, $packageId)
    {
        $request->validate([
            'step' => 'required|string|max:255'
        ]);

        $user = Auth::user();

        // Encontrar o delivery relacionado ao pacote
        $delivery = Delivery::whereHas('package', function ($query) use ($packageId) {
            $query->where('id', $packageId);
        })->first();

        if (!$delivery) {
            return redirect()->back()->with('error', 'Pacote não encontrado.');
        }

        // Atualizar o last_to_update para o entregador atual e adicionar o step
        $delivery->update([
            'last_to_update' => $user->id,
            'mode' => Mode::IN_MOVEMENT,
            'step' => $request->step
        ]);

        return redirect()->back()->with('success', 'Pacote coletado com sucesso!');
    }

    public function myDeliveries(Request $request)
    {
        $user = Auth::user();

        $query = Package::with(['address', 'deliver.unit'])
            ->leftJoin('deliveries', 'packages.id', '=', 'deliveries.package_id')
            ->leftJoin('units', 'deliveries.unit_id', '=', 'units.id')
            ->select(
                'packages.*',
                'deliveries.id as code',
                'deliveries.status as status',
                'deliveries.unit_id as unit_id',
                'deliveries.step as step',
                'units.title as unit_title'
            )
            ->where('status', '!=', Status::DELIVERED)
            ->where('deliveries.last_to_update', $user->id)
            ->where('deliveries.mode', Mode::IN_MOVEMENT);

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

        $packages = $query->paginate(10)->appends($request->query());

        $packages->getCollection()->transform(function (Package $package) {
            $package->formatted_address = $package->address?->print(\App\Models\Address::STREET_MAIN_INFORMATION) ?? 'Endereço não encontrado';
            if ($package->status == Status::IN_SEPARATION)
                $package->status = "Em separação";
            else if ($package->status == Status::ON_WAY)
                $package->status = "A caminho";
            else if ($package->status == Status::DELIVERED)
                $package->status = "Entregue";

            return $package;
        });

        // Get all units for the delivery modal
        $units = Unit::with('address')->get();

        return Inertia::render('deliver/my-deliveries', [
            'packages' => $packages->items(),
            'pagination' => [
                'current_page' => $packages->currentPage(),
                'total' => $packages->total(),
                'per_page' => $packages->perPage(),
                'last_page' => $packages->lastPage(),
            ],
            'search' => $request->search ?? '',
            'units' => $units
        ]);
    }

    public function deliver(Request $request, $packageId)
    {
        // Debug: log dos dados recebidos
        \Log::info('Dados da entrega:', $request->all());

        $request->validate([
            'delivery_type' => 'required|in:final,unit',
            'unit_id' => 'required_if:delivery_type,unit|nullable|exists:units,id',
            'step' => 'required|string|max:255'
        ]);

        $user = Auth::user();

        // Encontrar o delivery relacionado ao pacote
        $delivery = Delivery::whereHas('package', function ($query) use ($packageId) {
            $query->where('id', $packageId);
        })->first();

        if (!$delivery) {
            return redirect()->back()->with('error', 'Pacote não encontrado.');
        }

        // Verificar se o entregador atual é o responsável
        if ($delivery->last_to_update != $user->id) {
            return redirect()->back()->with('error', 'Você não tem permissão para entregar este pacote.');
        }

        if ($request->delivery_type === 'final') {
            // Entrega final - alterar status para entregue
            $delivery->update([
                'status' => Status::DELIVERED,
                'step' => $request->step
            ]);
            $message = 'Pacote entregue no destino final com sucesso!';
        } else {
            // Entrega para unidade - alterar mode e unit_id
            $delivery->update([
                'mode' => Mode::WAITING_FOR_UNIT,
                'unit_id' => $request->unit_id,
                'step' => $request->step
            ]);
            $message = 'Pacote enviado para a unidade com sucesso!';
        }

        return redirect()->back()->with('success', $message);
    }

    public function show(Package $package)
    {
        $user = Auth::user();

        // Carregar o pacote com relacionamentos
        $package->load(['address', 'deliver.unit', 'deliver.lastToUpdate']);

        // Verificar se o entregador tem permissão para ver este pacote
        if ($package->deliver && $package->deliver->last_to_update !== $user->id) {
            return redirect()->route('dashboard.deliver')->with('error', 'Você não tem permissão para visualizar este pacote.');
        }

        // Formatar informações para exibição
        $packageData = [
            'id' => $package->id,
            'code' => $package->deliver?->id ?? 'N/A',
            'width' => $package->width,
            'height' => $package->height,
            'depth' => $package->depth,
            'weight' => $package->weight,
            'formatted_address' => $package->address?->print(\App\Models\Address::TOTAL) ?? 'Endereço não encontrado',
            'status' => $package->deliver?->status,
            'step' => $package->deliver?->step ?? 'Nenhum passo registrado',
            'unit_title' => $package->deliver?->unit?->title ?? 'N/A',
            'created_at' => $package->created_at,
            'updated_at' => $package->deliver?->updated_at ?? $package->updated_at,
        ];

        // Traduzir status
        if ($packageData['status'] == Status::IN_SEPARATION) {
            $packageData['status'] = "Em separação";
        } else if ($packageData['status'] == Status::ON_WAY) {
            $packageData['status'] = "A caminho";
        } else if ($packageData['status'] == Status::DELIVERED) {
            $packageData['status'] = "Entregue";
        }

        return Inertia::render('deliver/show', [
            'package' => $packageData
        ]);
    }
}
