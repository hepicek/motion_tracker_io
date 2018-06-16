import React from 'react';

const USER_PHOTO = (props) => {

    return (
        <div className="userPhotoSection">
                <img className="userPhoto" src={"/storage/" + props.img_url} />  
                <p>Upload Profile Photo:</p>
                    <input 
                        className="userProfileForm-input" 
                        name="user_photo" 
                        type="file"
                        onChange={props.handleFileSelected}
                    />
                <div 
                    className="uploadPhotoBtn" 
                    onClick={props.handleFileSubmit}
                >
                    Upload file
                </div>

        </div>
    )
}

export default USER_PHOTO;