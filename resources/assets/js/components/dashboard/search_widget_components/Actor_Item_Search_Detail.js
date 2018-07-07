import React, {Component} from 'react';
import ACTOR_ITEM_SEARCH_DETAIL_MOVIE_CARD from './Actor_Item_Search_Detail_Movie_Card';
import axios from "axios/index";

class ACTOR_ITEM_SEARCH_DETAILS extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        let movies = this.props.actorMovies.map(movie => {
            return (
                <ACTOR_ITEM_SEARCH_DETAIL_MOVIE_CARD 
                    key={"actorSearchMovieCard-" + movie.imdb_id}
                    movie={movie} 
                />
            )
        })
        return (
            <div className="bg-white p-2 d-flex flex-wrap">
                {this.props.loading && <p>loading...</p>}
                {this.props.loading || movies}
            </div>

        )
    }
}

export default ACTOR_ITEM_SEARCH_DETAILS;