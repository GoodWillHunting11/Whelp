import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './PhotoStream.css'

const PhotoStream = () => {
    const history = useHistory()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)
    const single = businesses.find(single => single.id === +id)

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handleDelete = async (photoId) =>  {

        await fetch(`/api/photos/delete/${photoId}/`, {
            method: "DELETE",
        });

        history.push(`/businesses/${id}`)
    }

    if(!single) {
        return (
            <h1 className='roll-heading'>Whelp! There's nothing here.</h1>
        )
    }

    return (
        <>
            <div className='title-container'>
                <h1 className='photo-stream-title'>Photos from <span className='photo-subtitle'>{single.name}</span></h1>
            </div>
            <div className='outside-grid'>
                    {single?.photos?.map((photo, idx) => (

                        <figure  key={idx}>

                                <img className='photo-spread' alt={`whelp-${photo.id}`} src={photo.url} />
                                {user?.role === 'admin' ? <button className='trash' onClick={() => handleDelete(photo.id)}><b><FontAwesomeIcon icon={faTrash} className='fa-trash' /></b></button>:<></>}

                        </figure>

                    ))}
            </div>
        </>
    )
}


export default PhotoStream
