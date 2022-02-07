import './Photos.css'

const PhotoThumbnail = ({url}) => {

    return (
        <div className='thumbnail' style={{backgroundImage: `url(${url})`, backgroundSize: "cover", backgroundPosition: "center"}}>

        </div>
    )
}

export default PhotoThumbnail
