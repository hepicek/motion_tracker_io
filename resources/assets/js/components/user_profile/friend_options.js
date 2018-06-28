import React, {Component} from 'react';

class FRIEND_OPTIONS extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        window.addEventListener('mousedown', this.props.handleClickOutside);
    }  
    componentWillUnmount() {
        window.removeEventListener('mousedown', this.props.handleClickOutside);
    }
    render() {
        return (
            <div 
                className="friendOptions"
                onClick={this.props.deleteFriend}
            >
                Delete
            </div>
        )
    }
}

export default FRIEND_OPTIONS;