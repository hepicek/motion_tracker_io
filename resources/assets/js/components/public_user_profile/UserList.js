import React, {Component} from 'react';
import ListItem from "./ListItem";
import {Collapse} from 'reactstrap';

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            collapse: !prevState.collapse
        }))
    }
    render() {
        const { userlist } = this.props;
        const userLists = Object.keys(userlist.items).map(key => userlist.items[key]);
        return (
            <div 
                className="bg-light p-2 m-1"
                style={{cursor: "pointer"}}
            >
                <h5 onClick={this.toggle}>{userlist.list_title}</h5>
                <Collapse isOpen={this.state.collapse}>
                    <div className="d-flex flex-wrap">
                    {userLists.map((listItem, index) => {
                        return (
                            <ListItem key={'listItem-' + index} listItem={listItem}/>
                        )
                    })}
                    </div>
                </Collapse>
            </div>
        );
    }
};

export default UserList;
