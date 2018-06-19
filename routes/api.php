<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    // var_dump($request->user());
    return $request->user();
});









// Route::get('lists', 'ListController@index');
// Route::get('lists/{user_id}/{list_id}', 'ListsController@view');

//Route::delete('movies/{movie}', 'MoviesController@delete');
