<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//Main with list of loans
$app->get('/', [
    'as' => 'loan.index', 'uses' => 'LoanController@index'
]);

//View loan
$app->get('/view/{id}', [
    'as' => 'loan.view', 'uses' => 'LoanController@view'
]);

//Get status of history record
$app->get('/status/{id}', [
    'as' => 'loan.status', 'uses' => 'LoanController@getHistoryStatus'
]);

//Extend loan
//For some reason POST didn't work here, had to use GET
$app->get('/extend', [
    'as' => 'loan.extend', 'uses' => 'LoanController@extend'
]);

//Create new loan
$app->post('/store', [
    'as' => 'loan.store', 'uses' => 'LoanController@store'
]);