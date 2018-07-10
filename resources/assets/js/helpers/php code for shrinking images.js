        // $img = Image::make($file);
        // $img_width_300 = 300;
        // $img->resize($img_width_300, null, function ($constraint) {
        //     $constraint->aspectRatio();
        // });
        // $img->save('./storage/app/public/img/movie_img/' . $file_name . '_' . $img_width_300 . '.' . $file_ext);

// import jsonp from 'jsonp';
// import { TMDB_KEY } from '../../../config/js/config';
// import Spinner from "./helpers/Spinner";
// import {Card, CardGroup, CardImg, CardBody} from 'reactstrap';

            // componentDidMount() {
    //     jsonp(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`, null, (err, data) => {
    //         if (err) {
    //             return undefined;
    //         } else {
    //             this.setState({
    //                 topMovies: data.results,
    //                 loading: false,
    //             });
    //         }
    //     });

    // } 



            // const loading =this.state.loading;
        // let topMovies = this.state.topMovies.map(movie => (

        //     <div 
        //         className="m-2 px-2 p-1 bg-white d-flex col-md-12 col-sm-12 align-items-center"
        //         key={movie.id}
        //         style={{
        //             //width: "48%"
        //         }}
        //     >
        //         <img style={{height: "30vmin"}} className="" src={"http://image.tmdb.org/t/p/w185" + movie.poster_path} alt="Card image cap" />
        //         <CardBody className="card-body p-0 ml-2 align-self-center flex-shrink-1" style={{height: '100%', overflow: 'auto'}}>
        //             <h5 className="card-title">{movie.original_title}</h5>
        //             <p className="card-text text-justify py-0 my-0" style={{overflowY: "auto", fontWeight: "normal", fontSize: ".8rem", fontFamily: 'Roboto'}}>{movie.overview}</p>
        //         </CardBody>
        //     </div>
        // ));