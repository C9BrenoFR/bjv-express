<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Status;

class TrackingController extends Controller
{
    public function index()
    {
        return Inertia::render('TrackingPage');
    }

    public function show(Request $request)
    {
        $request->validate([
            'delivery_id' => 'required|string'
        ]);

        $delivery = Delivery::with(['package.address', 'unit'])
            ->where('id', $request->delivery_id)
            ->first();

        if (!$delivery) {
            return redirect()->route('tracking')->with('error', 'Delivery não encontrado com o ID fornecido.');
        }

        // Preparar os dados do pacote para o componente package-show
        $packageData = [
            'id' => $delivery->package->id,
            'code' => $deliver->id ?? 'N/A',
            'width' => $delivery->package->width,
            'height' => $delivery->package->height,
            'depth' => $delivery->package->depth,
            'weight' => $delivery->package->weight,
            'formatted_address' => $delivery->package->address?->print(\App\Models\Address::TOTAL) ?? 'Endereço não encontrado',
            'status' => $delivery->status,
            'step' => $delivery->step ?? 'Nenhum passo registrado',
            'unit_title' => $delivery->unit?->title ?? 'N/A',
            'created_at' => $delivery->package->created_at,
            'updated_at' => $delivery->updated_at ?? $delivery->package->updated_at,
        ];

        if ($packageData['status'] == Status::IN_SEPARATION) {
            $packageData['status'] = "Em separação";
        } else if ($packageData['status'] == Status::ON_WAY) {
            $packageData['status'] = "A caminho";
        } else if ($packageData['status'] == Status::DELIVERED) {
            $packageData['status'] = "Entregue";
        }

        return Inertia::render('TrackingResult', [
            'packageData' => $packageData,
            'deliveryId' => $delivery->id
        ]);
    }
}
