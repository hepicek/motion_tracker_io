import React, { Component } from 'react';

const TOP_MOVIES_WIDGET = (props) => {
    let topMovies = props.topMovies.map(movie => (

        <div 
            className="card topMoviesWidgetCard" 
            key={movie.id} 
        >
            <img style={{width: '6rem'}}   className="card-img-top topMoviesWidgetCard-img" src={"http://image.tmdb.org/t/p/w185" + movie.poster_path} alt="Card image cap" />
            <div className="card-body topMoviesWidgetCard-body">
                <h5 className="card-title">{movie.original_title}</h5>
                <p className="card-text">{movie.overview}</p>
            </div>
        </div>
    ))
    return (

        <div className='dashboardWidget'>
        {topMovies}
        </div>
    )
}

export default TOP_MOVIES_WIDGET;