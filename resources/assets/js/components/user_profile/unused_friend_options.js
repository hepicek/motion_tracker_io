import React, {Component} from 'react';
import {Popover} from 'reactstrap';

class FRIEND_OPTIONS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popoverOpen: false,
        }
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        window.addEventListener('mousedown', this.props.handleClickOutside);
    }  
    componentWillUnmount() {
        window.removeEventListener('mousedown', this.props.handleClickOutside);
    }
    toggle() {
        this.setState(prevState => ({
            popoverOpen: !prevState.popoverOpen
        }))
    }
    render() {
        return (
            <Popover 
                placement="bottom"
                isOpen={this.state.popoverOpen}
                toggle={this.toggle}
                className="friendOptions"
                onClick={this.props.deleteFriend}
            >
                Delete
            </Popover>
        )
    }
}

export default FRIEND_OPTIONS;