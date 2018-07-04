import React, {Component} from 'react';
import axios from "axios/index";
import {decodeString} from '../../../helpers/helper';
import { AWS_URL } from '../../../../../../config/js/config';

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

    render() {
        let poster = AWS_URL + this.state.movieDetail.imdb_img;
        let actor = this.state.actors.map((actor, id) => {
            let image = (actor.person_img == "" || !actor.person_img) ? 'img/person_img/person_placeholder.png' : actor.person_img;
            let imageBackground = AWS_URL + image;
            return (
                <div
                    className="actorDetail"
                    key={'actor-detail-' + id}
                >
                    <div key={'actor-image-' + id}
                         className="searchItemDetails-actorImgContainer"
                         style={{
                             backgroundImage: `url(${imageBackground})`
                         }}
                    ></div>
                    <p key={'actor-' + id}>{decodeString(actor.fullname)}</p>
                </div>
            )

        });
        let directors = this.state.directors.map((director, id) => (
            <p
                key={'director-' + id}
            >{decodeString(director.fullname)}</p>
        ));
        return (
            <div className="searchItemDetails">
                <div className="searchItemDetails-main">
                    <div className="searchItemDetails-posterContainer"
                         style={{
                             backgroundImage: `url(${poster})`
                         }}
                    ></div>
                    <div className="searchItemDetails-main-text">
                        <div className="searchItemDetails-mainInfo">
                            <p><strong>Director(s):</strong></p>
                            {this.state.directors && directors}
                            <p><strong>Release Date:</strong></p>
                            {this.state.movieDetail && this.state.movieDetail.releaseInfo}
                            <p><strong>Runtime:</strong></p>
                            {this.state.movieDetail && this.state.movieDetail.runTime + " min"}
                        </div>
                        <p className="searchItemDetails-storyLine">
                            {this.state.movieDetail.storyline && decodeString(this.state.movieDetail.storyline)}
                        </p>
                    </div>
                </div>

                <div className="actorsDetails">
                    <p><strong>Cast:</strong></p>
                    <div className="actorDetails-cast">
                        {actor}
                    </div>
                </div>
            </div>
        )
    }
}

export default MOVIE_ITEM_SEARCH_DETAILS;

