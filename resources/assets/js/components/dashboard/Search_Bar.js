import React, {Component} from 'react';

class SEARCH_BAR extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='findMove' className='searchBar'>
                <p style={{fontStyle: 'italic'}}>find a movie...
                    <input
                    name='searchBar-input'
                    id='searchBar-input'
                    type='text'
                    value={this.props.searchText}
                    placeholder='Actor, director, title, year...'
                    onChange={this.props.handleSearch}
                    /></p>
                {/*<p>Search By:
                    <select
                        name='searchBar-mode'
                        id='searchBar-mode'
                        type='select'
                    >
                        <option value='title'>Title</option>
                        <option value='cast'>Cast</option>
                        <option value='director'>Director</option>
                    </select></p>
                <input
                    id='searchBar-submit'
                    type='submit'
                    value='Go!'
                />*/}
            </div>
        )
    }
}

export default SEARCH_BAR;