import React from 'react';
//enctype="multipart/form-data"
const USER_DETAILS_FORM = (props) => {
    let userDetails = props.userDetails;
    return (    
        <form className="userProfileForm" name="userProfileForm" method="post" action={"/userDetails/" + userDetails.id} encType="multipart/form-data">
            <div className="userProfile_formRow" >
                <p>First Name:</p>
                <span>
                    <input 
                        className="userProfileForm-input" 
                        name="first_name"
                        value={userDetails.first_name} 
                        onChange={props.handleChange}
                    />
                    <i className="fa fa-edit"></i>
                </span>
            </div>
            <div className="userProfile_formRow" >
                <p>Last Name:</p>
                <span>
                    <input 
                        className="userProfileForm-input" 
                        name="last_name" 
                        value={userDetails.last_name} 
                        onChange={props.handleChange}
                    />
                    <i className="fa fa-edit"></i>
                </span>
            </div>
            <div className="userProfile_formRow" >
                <p>Common Name:</p>
                <span>
                    <input 
                        className="userProfileForm-input" 
                        name="common_name" 
                        value={userDetails.common_name} 
                        onChange={props.handleChange}
                    />
                    <i className="fa fa-edit"></i>
                </span>
            </div>
            <div className="userProfile_formRow" >
                <p>Email:</p>
                <span>
                    <input 
                        className="userProfileForm-input" 
                        name="email" 
                        value={userDetails.email} 
                        onChange={props.handleChange}
                    />
                    <i className="fa fa-edit"></i>
                </span>
            </div>
            <div className="userProfile_formRow" >
                <p>Date of Birth:</p>
                <span>
                    <input 
                        className="userProfileForm-input" 
                        name="dob" 
                        type="date"
                        value={userDetails.dob} 
                        onChange={props.handleChange}
                    />
                    <i className="fa fa-edit"></i>
                </span>
            </div>
            <input 
                type="submit" 
                value="Save Changes" 
                onClick={props.handleSubmit}
            />
        </form>
    )
}

export default USER_DETAILS_FORM;