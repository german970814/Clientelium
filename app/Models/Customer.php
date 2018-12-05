<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\Rule;
use App\Libraries\CacheMethods;

class Customer extends Model {
    use CacheMethods;

    /**
     * Table in database
     * 
     * @var string
     */
    protected $table = 'customers';

    /**
     * Fillable fields for create and update methods
     * 
     * @var array
     */
    protected $fillable = [
        'name', 'address', 'last_name', 
        'birthday_date', 'phone', 'user_id',
        'cellphone', 'identification_number',
        'identification_type', 'status'
    ];

    /**
     * Status constant when user is active
     * 
     * @var string
     */
    static $ACTIVE = 'A';

    /**
     * Status constant when customer is deleted
     * 
     * @var string
     */
    static $DELETED = 'D';

    /**
     * Returns rules to validate fields in controllers
     * 
     * @param  \App\Models\Customer  $customer
     * @return array
     */
    static public function getRulesToValidate(Customer $customer=null) {
        return [
            'name' => 'required',
            'address' => 'required',
            'last_name' => 'required', 
            'birthday_date' => 'required|date',
            'phone' => 'nullable|numeric|max:9999999999',
            'cellphone' => 'nullable|numeric|max:9999999999',
            'identification_number' => 'required|numeric|max:9999999999|unique:customers,identification_number,' . ($customer ? $customer->id : 'NULL') . ',id,identification_type,' . Input::get('identification_type'),
            'identification_type' => 'required|in:CC,CE,CI,PA|unique:customers,identification_type,' . ($customer ? $customer->id : 'NULL') . ',id,identification_number,' . Input::get('identification_number'),
        ];
    }
}
