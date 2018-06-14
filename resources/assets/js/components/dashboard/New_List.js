import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class New_List extends Component {
    constructor(props) {
        super(props)
        this.newListInput = React.createRef();

    }
    componenentDidMount() {
        console.log("WTF!");
        this.newListInput.current.focus();
    }
    
    render() {
        return (
            <input 
                type="text"  
                placeholder="new list title" 
                className="newListInput" 
                id="newListInput"
                ref={this.newListInput}
                onKeyUp={this.props.saveNewList}
            />
        )
    }
}

export default New_List;