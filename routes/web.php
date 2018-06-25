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

    //User list routes
    Route::get('userLists', 'ListController@getUserLists');
    Route::post('userLists', 'ListController@storeUserList');
    Route::delete('userLists/{id}', 'ListController@destroyUserList');
    Route::put('userLists/{id}', 'ListController@updateUserList');

    Route::delete('userListItem/{id}', 'ListController@destroyUserListItem');

    //Drag and Drop route
    Route::get('userListsDnD/{list_id}/{id}', 'ListController@storeUserListItem');

    //Movies routes
    Route::get('movies', 'MoviesController@index');
    Route::get('movies/{movie}', 'MoviesController@show');
    Route::post('movies','MoviesController@store');
    Route::put('movies/{movie}','MoviesController@update');
    Route::get('searchexternal/{searchString}', 'MoviesController@exSearch');
    Route::get('search/{movie}', 'MoviesController@searchMovies');
    
    Route::get('search/external/{movie_id}', 'MoviesController@externalGetDetails');


    Route::get('searchMovieDetails/{imdb_id}', 'MoviesController@searchMovieDetails');


    Route::post('userListItems/{id}', function(Request $request) {
        return List_Item::create($request->all());
    });
    Route::post('userListItems/{id}', function($id) {
        List_Item::find($id)->delete();
        return 204;
    });





    Route::post('userLogin', 'UserController@userLogin');
    Route::post('userRegister', 'UserController@userRegister');

});

Route::get('searchUsers/{user}', 'UserController@searchUsers');
Route::get('searchActors/{name}', 'MoviesController@searchActors');
Route::get('searchActorDetails/{id}', 'MoviesController@searchActorDetails');

//Route::get('tmdb/{id}', 'MoviesController@tmdb');
//Route::post('moviesImage','MoviesController@resizeAndStoreImage');



Route::get('login/facebook', 'Auth\LoginController@redirectToProvider');
Route::get('login/facebook/callback', 'Auth\LoginController@handleProviderCallback');

