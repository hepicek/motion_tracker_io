import React, {Component} from 'react';
import axios from "axios/index";

class MOVIE_ITEM_SEARCH_DETAILS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actors: []
        }
    }

    componentWillMount() {
        let movieItemImdbId = this.props.MovieItemDetails.imdb_id;
        axios.get(`/searchActors/${movieItemImdbId}`)
            .then((res) => {
                let searchResults = Object.keys(res).map(key => res[key]);
                this.setState({actors: searchResults[0]});
            });
    }



    render() {
        let actor = this.state.actors.map((actor, id) => (
            <p
                key={'actor-' + id}
            >{actor.fullname}</p>
        ));

        return (
            <div className="searchItemDetails">
                <p>{this.props.MovieItemDetails.rating}</p>
                {actor}
            </div>
        )
    }
}


export default MOVIE_ITEM_SEARCH_DETAILS;



