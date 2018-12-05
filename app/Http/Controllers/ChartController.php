<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Models\Customer;

class ChartController extends Controller {
    public function activeCustomers() {
        $activeCustomers = Customer::where('status', Customer::$ACTIVE)->count();
        $deletedCustomers = Customer::where('status', Customer::$DELETED)->count();

        $totalCustomers = $activeCustomers + $deletedCustomers;
        $percentActiveCustomers = ((bool) $totalCustomers) ? (($activeCustomers / $totalCustomers) * 100) : 0;
        $percentDeletedCustomers = ((bool) $totalCustomers) ? (($deletedCustomers / $totalCustomers) * 100) : 0;

        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => [
                'active' => $percentActiveCustomers,
                'deleted' => $percentDeletedCustomers
            ]
        ]);
    }

    public function customersBornYear() {
        $birthdayDates = Customer::orderBy('birthday_date')->pluck('birthday_date');

        $bornYears = array();
    
        foreach ($birthdayDates->all() as $bornDate) {
            $bornYear = date('Y', strtotime($bornDate));
            if (isset($bornYears[$bornYear])) {
                $bornYears[$bornYear]++;
            } else {
                $bornYears[$bornYear] = 1;
            }
        }

        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => [
                'data' => $bornYears
            ]
        ]);
    }

    public function customersByIdentificationType() {
        $identificationTypes = Customer::pluck('identification_type');

        $data = array();

        foreach ($identificationTypes->all() as $identificationType) {
            if (isset($data[$identificationType])) {
                $data[$identificationType]++;
            } else {
                $data[$identificationType] = 1;
            }
        }

        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => [
                'data' => $data
            ]
        ]);
    }
}