import React, { Component } from 'react';

const SEARCH_BAR = (props) => {
    return (
            <form method="" action="" id='findMove' className='searchBar'>
                <p style={{fontStyle: 'italic'}}>find a movie... <input 
                    name='searchBar-input' 
                    id='searchBar-input' 
                    type='text' 
                    placeholder='Actor, director, title, year...'
                /></p>
                <p>Search By: 
                <select 
                    name='searchBar-mode'
                    id='searchBar-mode'
                    type='select'
                >
                    <option value='title'>Title</option>
                    <option value='cast'>Cast</option>
                    <option value='director'>Director</option>
                </select> </p>
                <input 
                    id='searchBar-submit'
                    type='submit'
                    value='Go!'
                />
            </form>
    )
}

export default SEARCH_BAR;