import './HeroSingle.css'
import logo from '../../../../img/splash-logo.png'

const SingleHero  = ({single, reviews}) => {
    return (
        <div className='single-hero-container'>
            <div className='single-hero-content'>
                <div className='single-hero-title-container'>
                    <h1 className='single-h1'>{single.name}</h1>
                    <p className='single-p'>{reviews.length} reviews</p>
                    <p className='single-p'>Category | {single.categories[0].category}</p>
                </div>
            </div>
        </div>
    )
}


export default SingleHero
