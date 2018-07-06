import React, {Component} from 'react';
import {Col} from 'reactstrap';

class SEARCH_BAR extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='findMove' className='d-flex align-items-center py-2 w-100'>
            <Col md="8" className="d-flex justify-content-center">
                <p 
                    style={{
                        fontStyle: 'italic',
                        margin: "0px"
                    }}
                >find a movie...
                    <input
                    name='searchBar-input'
                    className="ml-2"
                    id='searchBar-input'
                    type='text'
                    value={this.props.searchText}
                    placeholder='Actor, director, title, year...'
                    onChange={this.props.handleSearch}
                    />
                </p>
            </Col>
            </div>
        )
    }
}

export default SEARCH_BAR;