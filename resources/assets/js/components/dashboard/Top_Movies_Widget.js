import React from 'react';
import TOP_MOVIE_CARD from './top_movies_widget_components/top_movie_card';

const TOP_MOVIES_WIDGET = (props) => {
    let topMovies = props.topMovies.map(movie => (
        <TOP_MOVIE_CARD
            key={"topMovie-" + movie.id}
            movie={movie}
        />
    ));
    return (
        <div className='dashboardWidget' id='topMoviesWidget'>
            {topMovies}
        </div>
    )
};

export default TOP_MOVIES_WIDGET;