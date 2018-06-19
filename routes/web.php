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

use App\List_Item;

Auth::routes();

Route::get('/', 'LandingpageController@index');
Route::group(['middleware' => ['auth']], function() {
    
    //Page View Routes
    Route::get('/dashboard', 'DashboardController@index');
    Route::get('/userprofile', 'UserController@index');
    Route::post('/userprofile/{id}', 'UserController@destroyUserPhoto');

    //Data Routes
    Route::get('userDetails', 'UserController@userDetails');
    Route::post('userDetails/{id}', 'UserController@updateUserDetails');
    
    Route::get('userLists', 'ListController@getUserLists');
    Route::post('userLists', 'ListController@storeUserList');
    Route::delete('userLists/{id}', 'ListController@destroyUserList');
    Route::put('userLists/{id}', 'ListController@updateUserList');

    Route::post('userListItems/{id}', function(Request $request) {
        return List_Item::create($request->all());
    });
    Route::post('userListItems/{id}', function($id) {
        List_Item::find($id)->delete();
        return 204;
    });

    Route::get('movies', 'MoviesController@index');
    Route::get('movies/{movie}', 'MoviesController@show');
    Route::post('movies','MoviesController@store');
    Route::put('movies/{movie}','MoviesController@update');
    Route::get('search/{movie}', 'MoviesController@searchMovies');


    Route::post('userLogin', 'UserController@userLogin');
    Route::post('userRegister', 'UserController@userRegister');

});

Route::get('imdb', 'MoviesController@imdbTest');

Route::get('login/facebook', 'Auth\LoginController@redirectToProvider');
Route::get('login/facebook/callback', 'Auth\LoginController@handleProviderCallback');
