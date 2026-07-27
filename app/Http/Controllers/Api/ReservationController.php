<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\ReservationState;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reservation_date' => 'required|date',
            'return_date' => 'required|date|after_or_equal:reservation_date',

            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'identification_document' => 'nullable|string|max:255',
            'notes' => 'nullable|string',

            'equipment_item_ids' => 'required|array|min:1',
            'equipment_item_ids.*' => 'required|integer|exists:equipment_items,id',
        ]);

        $requestedState = ReservationState::where('name', 'Zatrazena')->firstOrFail();

        $reservation = Reservation::create([
            'user_id' => $request->user()->id,
            'reservation_date' => $validated['reservation_date'],
            'return_date' => $validated['return_date'],
            'notes' => $validated['notes'] ?? null,
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'phone' => $validated['phone'],
            'identification_document' => $validated['identification_document'] ?? null,
            'reservation_state_id' => $requestedState->id,
        ]);

        $reservation->reservedEquipments()->attach($validated['equipment_item_ids']);

        return response($reservation->load(['reservationState', 'reservedEquipments']), 201);
    }
}
