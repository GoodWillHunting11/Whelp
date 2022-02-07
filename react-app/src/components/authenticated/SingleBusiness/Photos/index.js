import './Photos.css'

const PhotoThumbnail = ({url}) => {
    console.log('heeeeeeeeeeeeelo', url)
    return (
        <div className='thumbnail' style={{backgroundImage: `url(${url})`, backgroundSize: "cover"}}>

        </div>
    )
}

export default PhotoThumbnail
