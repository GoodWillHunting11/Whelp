import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './PhotoStream.css'

const PhotoStream = () => {
    const {id} = useParams()
    const businesses = useSelector(state => state.businessState.entries)
    const single = businesses.find(single => single.id === +id)

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    if(!single) {
        return (
            <h1 className='roll-heading'>Whelp! There's nothing here.</h1>
        )
    }

    return (
        <>
            <div className='title-container'>
                <h1 className='photo-stream-title'>Photos from {single.name}</h1>
            </div>
            <div className='outside-grid'>
                    {single?.photos?.map((photo, idx) => (

                        <figure  key={idx}>

                                <img className='photo-spread' src={photo.url} />

                        </figure>

                    ))}
            </div>
        </>
    )
}


export default PhotoStream
