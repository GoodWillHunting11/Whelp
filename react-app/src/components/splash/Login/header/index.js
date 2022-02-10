import { Link } from 'react-router-dom'
import './login-header.css'
import logo from '../../../../img/log-logo.png'

function LogPageHeader() {
    return (
        <div className='main-log'>
            <div className='logo-log'>
                <Link to='/'><img alt='whelp-logo' className='logo-image' src={logo} /></Link>
            </div>
        </div>
    )
}

export default LogPageHeader
