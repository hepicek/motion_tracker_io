import React, {Component} from 'react';


class FRIEND_RESPOND_BTN extends Component {
    constructor(props) {
        super(props)
        this.state ={
            caret: "up"
        }
        this.handleFriendBtnClick = this.handleFriendBtnClick.bind(this);
        
    }
    handleFriendBtnClick() {
        this.setState({
            caret: this.state.caret === 'down' ? 'up' : 'down'
        });
    }
    render() {

        return (
            <div 
                className="addFriendButton select"
                onClick={this.handleFriendBtnClick}
            >
                Respond
                <i className={"fa fa-caret-" + this.state.caret} />
                {this.state.caret == 'down' && 
                    <div className="select-selectBtn">
                        <p onClick={() => {
                            this.props.handleFriendBtnClick(3, this.props.id);
                        }}>Accept</p>   
                        <p onClick={() => {
                            this.props.handleFriendBtnClick(4, this.props.id);
                        }}>Reject</p>
                    </div>
                }    
            </div>
        )
    }
}

export default FRIEND_RESPOND_BTN;