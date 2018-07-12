<?php
if (App::environment('production')) {
    URL::forceScheme('https');
}
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
Route::get('/randomPopularMovies', 'LandingpageController@randomPopularMovies');
Route::group(['middleware' => ['auth']], function() {
    
    //Page View Routes
    Route::get('/dashboard', 'DashboardController@index');
    Route::get('/userprofile', 'UserController@index');
    Route::post('/userprofile/{id}', 'UserController@destroyUserPhoto');

    //Data Routes
    Route::get('userDetails', 'UserController@userDetails');
    Route::post('userDetails/pw', 'UserController@updatePw');
    Route::post('userDetails/{id}', 'UserController@updateUserDetails');
    

    //User list routes
    Route::post('userLists', 'ListController@storeUserList');
    Route::post('userRatings', 'ListController@storeUserRating');
    Route::get('getUserTimeWasted/{user_id}', 'ListController@getUserTimeWasted');
    Route::put('userLists/{id}', 'ListController@updateUserList');
    Route::delete('userLists/{id}', 'ListController@destroyUserList');
    Route::get('userLists/{user_id?}', 'ListController@getUserLists');


    Route::delete('userListItem/{id}', 'ListController@destroyUserListItem');

    //Drag and Drop route
    Route::get('userListsDnD/{list_id}/{id}', 'ListController@storeUserListItem');

    //Movies routes
    Route::get('movies', 'MoviesController@index');
    Route::get('movies/{movie}', 'MoviesController@show');
    Route::post('movies','MoviesController@store');
    Route::put('movies/{movie}','MoviesController@update');
    Route::get('search/{movie}', 'MoviesController@searchMovies');
    
    Route::get('searchMovieDetails/{imdb_id}', 'MoviesController@searchMovieDetails');
    Route::get('search/external/{movie_id}', 'MoviesController@externalGetDetails');
    Route::get('searchexternal/{searchString}', 'MoviesController@exSearch');


    //Rating routes
    Route::post('movieRating', 'RatingsController@storeMovieRating');
    Route::get('movieRating/{imdb_id}', 'RatingsController@getUserRatingOrAverageRating');

    //Relationships routes
    Route::post('relationships', 'RelationshipsController@updateRelationship');
    Route::get('relationships/friendscount', 'RelationshipsController@getFriendsCount');
    Route::get('relationships/pending', 'RelationshipsController@pendingRelationships');
    Route::get('relationships/news', 'RelationshipsController@getNewsFeed');
    Route::get('relationships/{user_id?}', 'RelationshipsController@getRelationships');
    
    //User public profile
    Route::get('publicprofile/{user_id}', 'PublicUserProfileController@index');
    Route::get('publicuserprofile/{user_id}', 'PublicUserProfileController@userDetails');
    Route::get('recentactivity/{user_id}', 'RelationshipsController@getRecentUserActivity');

    //User Routes
    Route::get('searchUsers/{user}', 'UserController@searchUsers');
    Route::get('searchActors/{name}', 'MoviesController@searchActors');
    Route::get('searchActorDetails/{id}', 'MoviesController@searchActorDetails');

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

Route::get('search/external/{movie_id}', 'MoviesController@externalGetDetails');
Route::get('searchexternal/{searchString}', 'MoviesController@exSearch');

//Route::get('tmdb/{id}', 'MoviesController@tmdb');
//Route::post('moviesImage','MoviesController@resizeAndStoreImage');

Route::get('login/facebook', 'Auth\LoginController@redirectToProvider');
Route::get('login/facebook/callback', 'Auth\LoginController@handleProviderCallback');

