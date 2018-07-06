import React, { Component } from 'react';

class New_List extends Component {
    constructor(props) {
        super(props)
        

    }
    // componenentDidMount() {
    //     console.log("WTF!");
    //     this.newListInput.current.focus();
    // }
    
    render() {
        return (
            <input 
                type="text"  
                placeholder="new list title" 
                className="newListInput m-1 p-1" 
                style={{
                    outline: "none",
                }}
                id="newListInput"
                autoFocus
                onKeyUp={this.props.saveNewList}
            />
        )
    }
}

export default New_List;

// ref={this.newListInput} goes in <input

// this.newListInput = React.createRef(); goes in constructor