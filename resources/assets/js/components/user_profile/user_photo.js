import React from 'react';
import { AWS_URL } from '../../../../../config/js/config';

const USER_PHOTO = (props) => {
    if (props.file.name == "") {
        var file = false;
    } else {
        var file = true;
    }
    return (
        <div className="userPhotoSection">
            <img className="userPhoto" src={AWS_URL + props.img_url}/>
            <input
                className="userProfileForm-input"
                name="user_photo"
                type="file"
                onChange={props.handleFileSelected}
                ref={fileInput => this.fileInput = fileInput}
                hidden
            />
            <div className="userPhotoSection-buttons">
                <div
                    className="uploadPhotoBtn"
                    onClick={() => this.fileInput.click()}
                >
                    Choose file
                </div>
                {file && <p>{props.file.name} - </p>}
                <div
                    className="uploadPhotoBtn"
                    onClick={props.handleFileSubmit}
                >
                    Upload file
                </div>
                <div
                    className="uploadPhotoBtn deleteBtn"
                    onClick={props.handleDeletePhoto}
                >
                    Delete Photo
                </div>
            </div>
        </div>
    )
}

export default USER_PHOTO;