import React, {Component} from 'react';
import axios from "axios/index";
import TopMovie from "./components/landing_page/TopMovie";
import Spinner from "./helpers/Spinner";
import {Collapse} from 'reactstrap';

class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topMovies: [],
            loading: true,
            caret: "down",
            collapse: false
        };
        this.getPopularMovies = this.getPopularMovies.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            collapse: !prevState.collapse,
            caret: prevState.caret == "down" ? "up" : "down"
        }))
    }
    componentDidMount() {
        this.getPopularMovies()
    }

    getPopularMovies() {
        axios.get(`/randomPopularMovies`)
            .then((res) => {
                this.setState(() => ({topMovies: res.data, loading: false}));
            });
    }

    render() {

        return (
            <div style={{maxWidth: "1200px"}} className="mx-auto">
                <div
                    className="landingPage d-flex justify-content-between align-items-center flex-sm-column flex-md-row p-4">
                    <div
                        className="col-md-6 col-lg-6 d-flex flex-wrap landingPage-logo"
                    >
                        <div
                            className="logoLetter logoLetter-large letter-1 d-flex justify-content-center align-items-center bg-dark m-1">M
                        </div>
                        <div
                            className="logoLetter logoLetter-large letter-2 d-flex justify-content-center align-items-center bg-dark m-1">T
                        </div>
                        <div
                            className="logoLetter logoLetter-large letter-3 d-flex justify-content-center align-items-center bg-dark m-1">I
                        </div>
                        <div
                            className="logoLetter logoLetter-large letter-4 d-flex justify-content-center align-items-center bg-dark m-1">O
                        </div>
                    </div>
                    <div
                        style={{color: "#F8F9FA"}}
                        className="landingPage-infoBlock bg-dark p-5 col-lg-5 col-md-12 col-sm-12 d-flex flex-column justify-content-between"
                    >
                        <div>
                            <h2 className="mb-5">MotionTracker.io</h2>
                            <div className="d-flex mb-4">
                                <i style={{fontSize: "2rem"}} className="fa fa-film mr-4"></i><h4>Keep track of
                                everything
                                you watch</h4>
                            </div>
                            <div className="d-flex mb-4">
                                <i style={{fontSize: "2rem"}} className="fa fa-slideshare mr-4"></i><h4>Connect and
                                share
                                with your friends</h4>
                            </div>
                            <div className="d-flex mb-4">
                                <i style={{fontSize: "2rem"}} className="fa fa-compass mr-4"></i><h4>Explore and
                                discover
                                new things</h4>
                            </div>
                            <div className="d-flex">
                                <i style={{fontSize: "2rem"}} className="fa fa-users mr-4"></i><h4>Grow your
                                community</h4>
                            </div>
                        </div>
                        <div className="landingPage-btn d-flex justify-content-center w-100">
                            <a
                                className="btn btn-warning btn-lg"
                                href="/register">Sign-up
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div 
                        onClick={this.toggle} 
                        className="w-100 mb-2 d-flex justify-content-center justify-content-sm-between align-items-center"
                    >
                        <hr className="my-0 d-none d-sm-block" style={{width: "35%"}} />
                        <div style={{cursor: "pointer"}} className="d-flex align-items-center">
                            <h4 className="my-0" >Click Here to Learn More</h4>
                            <i className={"ml-2 fa fa-caret-" + this.state.caret}/>
                        </div>
                        <hr className="my-0 d-none d-sm-block" style={{width: "35%"}} />
                    </div>
                    <Collapse isOpen={this.state.collapse}>
                        <h1>FUCCCCKCKCKKC</h1>
                    </Collapse>
                </div>
                <div>
                    <h4 className="mx-4 mb-0">Popular movies:</h4>
                    <div 
                        className="d-flex flex-wrap justify-content-between px-4 py-2"
                           
                    >
                        {this.state.loading && <Spinner/>}
                        {this.state.topMovies.map((item, index) => {
                            return (
                                <TopMovie key={'topMovie-' + index} data={item}/>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Landingpage;


// <img className="m-1" style={{height: "210px"}} src={AWS_URL + 'img/M_Large_Light.png'} />
// <img className="m-1" style={{height: "210px"}} src={AWS_URL + 'img/T_Large_Light.png'} />
// <img className="m-1" style={{height: "210px"}} src={AWS_URL + 'img/I_Large_Light.png'} />
// <img className="m-1" style={{height: "210px"}} src={AWS_URL + 'img/O_Large_Light.png'} />