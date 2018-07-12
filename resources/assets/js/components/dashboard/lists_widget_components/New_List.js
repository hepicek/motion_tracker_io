import React, { Component } from 'react';

class New_List extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="d-flex align-items-center">
            <input 
                type="text"  
                placeholder="new list title" 
                className="newListInput ml-1 mr-2 my-1 p-1" 
                style={{
                    outline: "none",
                }}
                id="newListInput"
                autoFocus
                onKeyUp={this.props.saveNewList}
            />
            <img style={{height: "22px"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJZSURBVGhD7ZrL6w1RAMev9zMrC0oWXjtljUKxIEqKhQX+ASsWip0dKTbCUj8Lj43nxpoSG5aylWTDwlvx+cxtCt35mTlzzswp86lPzTlz55zz7c6598xjNPCfMAuP4nP8hj8j+Q6v4mpMzhy8j5MGEssPuBGTcgrt7A3uw4UYi3V4HW3/NcZs+w9m4lu0o21WJMDT9gnax2ErUrAS7cAwKTmG9nO+KCVgPdrBi6KUjoNoPxeLUgKGIA0ZgtRlCNKQIUhdQoMsxdnjzVpkGWQVfsJLRakeWQbZjB5zryjVYwhSl+yCuMJcgZ6/TdyJWQTxl+MklkvxUK9hXaIH8Vu4g+VgDPMsQEMsw7pED+I1tju9sttqRUdED+J57c69Rak7ogfxbscPTHYdXEH0IO54P97slGyCLMcl480gsgiyB7/g46IUxhbsNchu/Ioed9qKQA6gbTT574kWZBeWIbwlMwNDuYK2c6Io1SNKEJchsUKsxc/or+UaK2rSOoghnBOxQrzEygFNQ6sgv4dwcu/A7QE6Jy6jF1O29Qib/ncFB1mAZYhYfkcDzcemBAfxFLqN5SBe4cNAp9CJ3WRO/E2rU2sulmF84LIB+6L1ZDfMXew7TOsgkkOYKEHEMOXjtT7CRAsihnmAHvfUig6JGkTm4TlM9gisguhB+uKfQT5im2VHVxzCyiBOWne6BsqdM+hYJ14++EaBO2+gt4ZyxRuBTgHHOvGlAZcM5Qd8jn0c92ek8+Is+taDY7yJlZjQNwr8YM7ewsU4LYvwCF5AV6c56ZzYhAOZMxr9AvU9sEOv3d9XAAAAAElFTkSuQmCC" />
            </div>
        )
    }
}

export default New_List;