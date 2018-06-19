import React, { Component } from 'react';

const TOP_MOVIES_WIDGET = (props) => {
    let topMovies = props.topMovies.map(movie => (
        <div 
            className="topMoviesWidgetCard" 
            key={movie.id} 
        >
            <img 
                    className="topMoviesWidgetCard-img" 
                src={"http://image.tmdb.org/t/p/w185" + movie.poster_path}
                alt={movie.original_title} 
            />
            <p className="topMoviesWidgetCard-title">{movie.original_title}</p>
        </div>
    ));
    return (

        <div className='dashboardWidget' id='topMoviesWidget'>
        {topMovies}
        </div>
    )
};

export default TOP_MOVIES_WIDGET;