import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LIST_BTN_OPTIONS extends Component {
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
        let props = this.props;
        return (

            <div className="listMenuBtn_listOptions listMenuBtnArea">
                <div 
                className="listMenutBtn_listOptions_option listMenuBtnArea" 
                id={"renameListItem-" + props.listId}
                onClick={props.handleRenameListClick}
                >
                    <p className="listMenuBtnArea">Rename List</p>
                </div>
                <div 
                    className="listMenutBtn_listOptions_option listMenuBtnArea" 
                    id={"deleteListItem-" + props.listId}
                    onClick={props.handleListDeleteClick}
                >
                    <p className="listMenuBtnArea">Delete List</p>
                </div>
            </div>
        )
    }
}

// LIST_BTN_OPTIONS.propTypes = {
//     children: PropTypes.element.isRequired,
// };

export default LIST_BTN_OPTIONS;