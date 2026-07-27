<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable=[
        'user_id',
        'reservation_date',
        'return_date',
        'notes',
        'name',
        'surname',
        'phone',
        'identification_document',
        'reservation_state_id'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function reservationState(){
        return $this->belongsTo(ReservationState::class);
    }
    public function reservedEquipments(){
        return $this->belongsToMany(EquipmentItem::class, 'reserved_equipment');
    }
}
