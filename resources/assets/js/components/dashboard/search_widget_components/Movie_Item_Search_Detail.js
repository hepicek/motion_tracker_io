import React, {Component} from 'react';
import axios from "axios/index";
import {decodeString} from '../../../helpers/helper';
import {AWS_URL} from '../../../../../../config/js/config';
import {Card, CardBody, CardImg, Row, Col} from 'reactstrap';


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
        const background = this.state.movieDetail.imdb_img ? poster : AWS_URL + "img/movie_img/list_placeholder.jpg";

        let actor = this.state.actors.map((actor, id) => {
            let image = (actor.person_img == "" || !actor.person_img) ? 'img/person_img/person_placeholder.png' : actor.person_img;

            let imageBackground = AWS_URL + image;
            return (
                <Col className="d-flex flex-column align-items-center">
                    <div key={'actor-image-' + id}
                         style={{
                             backgroundImage: `url(${imageBackground})`,
                             height: '100px',
                             width: '70px',
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                             backgroundColor: '#D0D0D0'
                         }}
                    />
                    <p key={'actor-' + id}>{decodeString(actor.fullname)}</p>
                </Col>
            )

        });
        let directors = this.state.directors.map((director, id) => (
            <p
                key={'director-' + id}
            >{decodeString(director.fullname)}</p>
        ));
        return (
            <Card className="">
                <Row className="mx-0">
                    <Col md="3">
                        <CardImg className="p-2" top src={background} alt="poster"
                                 style={{minWidth: '150px', maxWidth: '200px'}}/>
                    </Col>
                    <Col md="9">
                        <Row className="mx-0">
                            <Col>
                                <p><strong>Director(s):</strong></p>
                                {this.state.directors && directors}
                            </Col>
                            <Col>
                                <p><strong>Release Date:</strong></p>
                                {this.state.movieDetail && this.state.movieDetail.releaseInfo}
                            </Col>
                            <Col>
                                <p><strong>Runtime:</strong></p>
                                {this.state.movieDetail && this.state.movieDetail.runTime + " min"}
                            </Col>
                        </Row>
                        <p className="">
                            {this.state.movieDetail.storyline && decodeString(this.state.movieDetail.storyline)}
                        </p>
                    </Col>
                </Row>
                <CardBody>
                    <p><strong>Cast:</strong></p>
                    <Row className="mx-0">
                        {actor}
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default MOVIE_ITEM_SEARCH_DETAILS;