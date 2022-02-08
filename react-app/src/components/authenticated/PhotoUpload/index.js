import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const UploadPicture = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [photo, setPhoto] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const { id } = useParams()
    const user = useSelector(state => state.session.user)


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
            history.push("/");
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
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default UploadPicture;
