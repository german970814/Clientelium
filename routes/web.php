<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});
Route::get('/charts', function () {
    return view('home');
});
Route::get('/customers', function () {
    return view('home');
});
Route::get('/customers/{id}/edit/page={page}', function () {
    return view('home');
});
Route::get('/customers/{id}/edit', function () {
    return view('home');
});
Route::get('/customers/{id}/page={page}', function () {
    return view('home');
});

Route::group(['middleware' => 'cors', 'prefix' => 'json'], function () {
    // Customers
    Route::get(
        '/customers/{id}',
        'CustomerController@detail'
    );
    Route::get(
        '/customers',
        'CustomerController@list'
    );
    Route::post(
        '/customers',
        'CustomerController@store'
    );
    Route::post(
        '/customers/{id}',
        'CustomerController@update'
    );
    Route::post(
        '/customers/{id}/delete',
        'CustomerController@delete'
    );

    // Charts
    Route::get(
        '/charts/active-users',
        'ChartController@activeCustomers'
    );
    Route::get(
        '/charts/born-years',
        'ChartController@customersBornYear'
    );
    Route::get(
        '/charts/identification-type',
        'ChartController@customersByIdentificationType'
    );
});