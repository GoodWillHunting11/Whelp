import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import imageUpload from '../../../img/upload.png'
import './PhotoUpload.css'

const UploadPicture = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [photo, setPhoto] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [selectImage, setSelectImage] = useState(false)
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)
    const single = businesses.find(single => single.id === +id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", photo)
        formData.append("user_id", user.id)
        formData.append("business_id", id)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/photos/new', {
            method: "POST",
            body: formData,
            "user_id": user.id
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push(`/businesses/${id}`);
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        setSelectImage(true)
    }

    if(!single) {
        return (
            <h1 className='roll-heading'>Whelp! There's nothing here.</h1>
        )
    }

    return (
        <div className="photo-upload-container">
            <div className="title-container">
                <h1 className="photo-stream-title">{single?.name}: <span className="photo-subtitle">Add Photos</span></h1>
            </div>
            <div className="photo-upload-form-container">
                <img className='upload-pic' alt="upload" src={imageUpload} />
                <h2 className='upload-form-h2'>Upload your {single?.name} photo here!</h2>
                <p className='upload-form-p'>
                    Only upload filetypes with (.png, .jpg, .jpeg, .gif) extensions.
                </p>
                <form className="upload-form-photo" onSubmit={handleSubmit}>
                    <label className="file-button"> Browse Photos
                    <input
                    className="file-button"
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                    />
                    </label>
                    {selectImage === true ? <button className='file-upload-button' type="submit">Upload Photo</button>:<button className='file-upload-button' type="submit" disabled>Please Select a File</button> }
                    {(imageLoading)&& <p>Loading...</p>}
                </form>
            </div>
        </div>
    )
}

export default UploadPicture;
