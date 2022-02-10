import './HeroSingle.css'

const SingleHero  = ({single, reviews}) => {
    if(!single.categories) {
        return (
            <h1>Loading</h1>
        )
    }

    let rating = 0;
    const ratings = reviews?.map(review => review.rating)
    if (ratings.length){
        ratings?.forEach( rate => rating = rate + rating)
        rating = rating / ratings.length
    }

    return (
        <div className='single-hero-container'>
            <div className='single-hero-content'>
                <div className='single-hero-title-container'>
                    <h1 className='single-h1'>{single.name}</h1>
                    <p className='single-p'>{reviews.length} reviews</p>
                    <span className="stars" style={{"--rating": `${rating}`}}></span>
                    <p className='single-p'>Category | {single?.categories[0]?.category}</p>
                </div>
            </div>
        </div>
    )
}


export default SingleHero
