import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw, faStethoscope, faCut, faDog, faBone, faBell } from '@fortawesome/free-solid-svg-icons'
import './SplashImage.css'
import logo from '../../../img/splash-logo.png'

function SplashImage() {
    const history = useHistory()

    const handleForm = (e) => {
        e.preventDefault()
        history.push('/login')
    }

    return (
        <div className='main-container'>
            <div className='splash-content'>
                <div className='splash-logo-container'>
                    <img className='logo-img' src={logo} />
                </div>
                <div className='splash-form-container'>
                    <form className='splash-search' >
                            <label  htmlFor="search" >
                                <input className='splash-search-input' id="search" autoComplete="off" placeholder='Find'>

                                </input>
                            </label>
                            <button className='splash-submit' onClick={handleForm}><FontAwesomeIcon icon={faPaw} className='fa-paw' /></button>
                            <div className='splash-links-container'>
                                <Link to='/login' className='splash-links'><FontAwesomeIcon icon={faCut} className='fa-nav' />Groomers</Link>
                                <Link to='/login' className='splash-links'><FontAwesomeIcon icon={faDog} className='fa-nav' />Parks</Link>
                                <Link to='/login' className='splash-links'><FontAwesomeIcon icon={faBell} className='fa-nav' />Walkers</Link>
                                <Link to='/login' className='splash-links'><FontAwesomeIcon icon={faStethoscope} className='fa-nav' />Veterinarians</Link>
                                <Link to='/login' className='splash-links'><FontAwesomeIcon icon={faBone} className='fa-nav' />Pet Stores</Link>
                            </div>
                        </form>

                </div>

            </div>
        </div>
    )
}


export default SplashImage
