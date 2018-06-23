import React, {Component} from 'react';
import axios from "axios/index";

class MOVIE_ITEM_SEARCH_DETAILS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actors: [],
            directors: [],
            movieDetail: []
        }
    }

    componentWillMount() {
        let movieItemImdbId = this.props.MovieItemDetails.imdb_id;
        axios.get(`/searchMovieDetails/${movieItemImdbId}`)
            .then((res) => {
                let searchResults = Object.keys(res).map(key => res[key]);
                this.setState({actors: searchResults[0][0]});
                this.setState({directors: searchResults[0][1]});
                this.setState({movieDetail: searchResults[0][2]});
            });
    }

    storyline() {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(`${this.state.movieDetail.storyline}`, 'text/html').body.textContent;
        return (<p>{decodedString}</p>);
    };

    render() {
        let poster = <img src={"./storage/" + this.state.movieDetail.imdb_img} alt="poster"/>;
        console.log(this.state.actors);
        let actor = this.state.actors.map((actor, id) => (
            <div key={'actor-detail-' + id}>
                <img key={'actor-image-' + id}
                     src={"./storage/" + this.state.movieDetail.imdb_img}
                     alt="poster"
                     className="actorImage"/>
                <p key={'actor-' + id}>{actor.fullname}</p>
            </div>
        ));
        let directors = this.state.directors.map((director, id) => (
            <p
                key={'director-' + id}
            >{director.fullname}</p>
        ));
        return (
            <div className="searchItemDetails">
                {this.state.movieDetail.imdb_img && poster}
                {this.storyline()}
                {directors}
                <div className="actorsDetails">
                    {actor}
                </div>
            </div>
        )
    }
}

export default MOVIE_ITEM_SEARCH_DETAILS;

