import React, {Component} from 'react';
import MOVIE_DETAILS_WIDGET from '../../movie_details_widget';
import {decodeString} from '../../../helpers/helper';
import REACTHOVER from 'react-hover';

const optionsCursorTrueWithMargin = {
    followCursor: false,
    shiftX: -100,
    shiftY: -80
  }

class MOVIE_TITLE extends Component {

    render() {
        return (
            <div 
                style={{
                    margin: "0",
                    cursor: "default",
                    marginRight: "2px"
                }}  
            >
            <REACTHOVER
                options={optionsCursorTrueWithMargin}
            >
                <REACTHOVER.Trigger type='trigger'>
                    <strong>{decodeString(this.props.movie_title)}</strong>
                </REACTHOVER.Trigger>
                <REACTHOVER.Hover type='hover'>
                    <MOVIE_DETAILS_WIDGET imdb_id={this.props.imdb_id} top="" left={this.props.left}/>
                </REACTHOVER.Hover>
            </REACTHOVER>
            </div>
        )
    }
}

export default MOVIE_TITLE;