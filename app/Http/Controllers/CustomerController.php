<?php

namespace App\Http\Controllers;

use DB;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Models\Customer;

class CustomerController extends Controller {
    /**
     * Validation messages error
     * 
     * @var array
     */
    private $messages = [
        'required' => 'Este campo es requerido',
        'date' => 'La fecha no es una fecha válida',
        'numeric' => 'El campo debe contener solo números',
        'max' => 'Este campo no puede superar los 10 caracteres',
        'in' => 'La opción escogida no es una de las disponibles',
        'identification_type.unique' => 'El tipo de identificación ya ha sido usado',
        'identification_number.unique' => 'El número de identificación ya ha sido usado',
    ];

    /**
     * Get a client by id an return his detail
     * 
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function detail($id) {
        $customer = Customer::findOrFail($id);

        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => $customer->toArray()
        ]);
    }

    /**
     * Store a client in database
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $validator = Validator::make($request->all(), Customer::getRulesToValidate(), $this->messages);

        if ($validator->fails()) {
            return response()->json([
                'code' => 400,
                'message' => 'Something is wrong',
                'data' => [
                    'errors' => $validator->messages()
                ]
            ]);
        }

        $validated_data = $validator->validate();

        $customer = Customer::create($validated_data);

        return response()->json([
            'code' => 200,
            'message' => 'Created Client',
            'data' => $customer->toArray()
        ]);
    }

    /**
     * Get a client by id and update his data in the database
     * 
     * @param int $id
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {
        $customer = Customer::findOrFail($id);

        $validator = Validator::make($request->all(), Customer::getRulesToValidate($customer), $this->messages);

        if ($validator->fails()) {
            return response()->json([
                'code' => 400,
                'message' => 'Something is wrong',
                'data' => [
                    'errors' => $validator->messages()
                ]
            ]);
        }

        $validated_data = $validator->validate();

        $customer->update($validated_data);

        return response()->json([
            'code' => 200,
            'message' => 'Client updated',
            'data' => $customer->toArray()
        ]);
    }

    /**
     * Archive a client to excempt of search
     * 
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id) {
        $customer = Customer::findOrFail($id);
        $customer->update(['status' => Customer::$DELETED]);

        return response()->json([
            'code' => 200,
            'message' => 'Client deleted',
        ]);
    }

    /**
     * Gives a list of clients
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request) {
        $query = $request->q;

        if ($query) {
            $customers = Customer::where('status', Customer::$ACTIVE)
                ->where(function($_query) use ($query) {
                    $_query
                        ->where('name', 'LIKE', $query . '%')
                        ->orWhere('last_name', 'LIKE', $query . '%')
                        ->orWhere('identification_number', 'LIKE', $query . '%');
                })
                ->distinct()
                ->paginate(5);
        } else {
            $customers = Customer::where('status', Customer::$ACTIVE)->paginate(5);
        }
        $customers->withPath('/json/customers');

        return response()->json([
            'code' => 200,
            'message' => '',
            'data' => $customers->toArray()
        ]);
    }
}