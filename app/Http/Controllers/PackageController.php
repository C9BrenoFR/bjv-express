<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Delivery;
use App\Models\History;
use App\Models\Package;
use App\Models\Unit;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Mode;
use Status;

class PackageController extends Controller
{
    public function index(Request $request)
    {
        $query = Package::with('address')
            ->leftJoin('deliveries', 'packages.id', '=', 'deliveries.package_id')
            ->select(
                'packages.*',
                'deliveries.id as code',
                'deliveries.status as status',
                'deliveries.unit_id as unit_id',
            );

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

        return Inertia::render('admin/packages', [
            'packages' => $packages->items(), // Pega apenas os dados dos pacotes
            'pagination' => [
                'current_page' => $packages->currentPage(),
                'total' => $packages->total(),
                'per_page' => $packages->perPage(),
                'last_page' => $packages->lastPage(),
            ],
            'search' => $request->search ?? ''
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/packages/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'width' => 'required|numeric|min:0',
            'height' => 'required|numeric|min:0',
            'depth' => 'required|numeric|min:0',
            'weight' => 'required|numeric|min:0',
            'value' => 'required|numeric|min:0',
            'street' => 'required|string|max:255',
            'number' => 'required|string|max:20',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:2',
            'zip_code' => 'required|string|max:10',
            'complement' => 'nullable|string|max:255',
        ]);

        // Criar endereço
        $address = Address::create([
            'street' => $validated['street'],
            'number' => $validated['number'],
            'city' => $validated['city'],
            'state' => $validated['state'],
            'zip_code' => $validated['zip_code'],
            'complement' => $validated['complement'],
        ]);

        // Criar pacote
        $package = Package::create([
            'width' => $validated['width'],
            'height' => $validated['height'],
            'depth' => $validated['depth'],
            'weight' => $validated['weight'],
            'address_id' => $address->id,
        ]);

        // Criar delivery associado ao pacote
        $delivery = Delivery::create([
            'package_id' => $package->id,
            'value' => $validated['value'],
            'status' => Status::IN_SEPARATION, // Status inicial
            'mode' => Mode::WAITING_FOR_UNIT, // Modo inicial
            'unit_id' => null, // Será definido quando for atribuído a uma unidade
            'last_to_update' => auth()->id(),
        ]);

        // Criar histórico inicial
        $delivery->histories()->create([
            'step' => 'Pacote criado e aguardando processamento',
            'mode' => Mode::WAITING_FOR_UNIT,
        ]);

        return redirect()->route('admin.packages')->with('success', 'Pacote criado com sucesso!');
    }

    public function show(Package $package)
    {
        $user = Auth::user();

        // Carregar o pacote com relacionamentos
        $package->load(['address', 'deliver.unit', 'deliver.lastToUpdate', 'deliver.histories']);

        // Verificar se o entregador tem permissão para ver este pacote
        if ($package->deliver && $package->deliver->unit_id !== $user->unit_id) {
            return redirect()->route('dashboard.deliver')->with('error', 'Você não tem permissão para visualizar este pacote.');
        }

        // Obter o histórico mais recente
        $latestHistory = $package->deliver?->histories?->sortByDesc('created_at')->first();

        // Formatar informações para exibição
        $packageData = [
            'id' => $package->id,
            'code' => $package->deliver?->id ?? 'N/A',
            'width' => $package->width,
            'height' => $package->height,
            'depth' => $package->depth,
            'weight' => $package->weight,
            'formatted_address' => $package->address?->print(Address::TOTAL) ?? 'Endereço não encontrado',
            'status' => $package->deliver?->status,
            'step' => $latestHistory?->step ?? 'Nenhum passo registrado',
            'histories' => $package->deliver?->histories?->sortByDesc('created_at')->values()->map(function ($history) {
                return [
                    'id' => $history->id,
                    'step' => $history->step,
                    'mode' => $history->mode,
                    'created_at' => $history->created_at,
                ];
            })->toArray() ?? [],
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

        return Inertia::render('operator/show', [
            'package' => $packageData
        ]);
    }

    public function edit(Package $package)
    {
        $package->load(['address', 'deliver']);

        // Incluir o valor do delivery se existir
        $packageData = [
            'id' => $package->id,
            'width' => $package->width,
            'height' => $package->height,
            'depth' => $package->depth,
            'weight' => $package->weight,
            'value' => $package->deliver?->value ?? 0,
            'address' => $package->address,
        ];

        return Inertia::render('admin/packages/edit', [
            'package' => $packageData
        ]);
    }

    public function update(Request $request, Package $package)
    {
        $validated = $request->validate([
            'width' => 'required|numeric|min:0',
            'height' => 'required|numeric|min:0',
            'depth' => 'required|numeric|min:0',
            'weight' => 'required|numeric|min:0',
            'value' => 'required|numeric|min:0',
            'street' => 'required|string|max:255',
            'number' => 'required|string|max:20',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:2',
            'zip_code' => 'required|string|max:10',
            'complement' => 'nullable|string|max:255',
        ]);

        // Atualizar endereço
        $package->address->update([
            'street' => $validated['street'],
            'number' => $validated['number'],
            'city' => $validated['city'],
            'state' => $validated['state'],
            'zip_code' => $validated['zip_code'],
            'complement' => $validated['complement'],
        ]);

        // Atualizar pacote
        $package->update([
            'width' => $validated['width'],
            'height' => $validated['height'],
            'depth' => $validated['depth'],
            'weight' => $validated['weight'],
        ]);

        // Atualizar delivery associado
        if ($package->deliver) {
            $package->deliver->update([
                'value' => $validated['value'],
                'last_to_update' => auth()->id(),
            ]);
        }

        return redirect()->route('admin.packages')->with('success', 'Pacote atualizado com sucesso!');
    }

    public function destroy(Package $package)
    {
        $package->delete();

        return redirect()->route('admin.packages')->with('success', 'Pacote deletado com sucesso!');
    }

    public function confirm(Request $request)
    {
        $unit = Auth::user()->unit;
        $query = Package::with(['address', 'deliver.histories'])
            ->leftJoin('deliveries', 'packages.id', '=', 'deliveries.package_id')
            ->leftJoin('histories', function ($join) {
                $join->on('deliveries.id', '=', 'histories.delivery_id')
                    ->whereRaw('histories.id = (SELECT MAX(h.id) FROM histories h WHERE h.delivery_id = deliveries.id)');
            })
            ->select(
                'packages.*',
                'deliveries.id as code',
                'deliveries.status as status',
                'histories.step as step',
                'deliveries.unit_id as unit_id',
            )
            ->where([
                ['unit_id', '=', $unit->id],
                ['deliveries.mode', '=', Mode::WAITING_FOR_UNIT],
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

        return Inertia::render('operator/confirm-packages', [
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

    public function recieve($packageId)
    {
        $user = Auth::user();

        $delivery = Delivery::whereHas('package', function ($query) use ($packageId) {
            $query->where('id', $packageId);
        })->first();

        if (!$delivery) {
            return redirect()->back()->with('error', 'Pacote não encontrado.');
        }

        $delivery->update([
            'last_to_update' => $user->id,
            'mode' => Mode::IN_UNIT,
        ]);

        // Criar histórico de recebimento na unidade
        $delivery->histories()->create([
            'step' => 'Pacote recebido na unidade ' . $user->unit->title,
            'mode' => Mode::IN_UNIT,
        ]);

        return redirect()->back()->with('success', 'Pacote confirmado com sucesso!');
    }
}
