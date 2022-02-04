import { useSelector } from "react-redux";
import { Redirect} from "react-router-dom";
import './SplashPage.css'

import SplashNavigation from "../Navigation";
import SplashImage from "../SplashImage";
import Footer from "../Footer";

function SplashPage() {
    const sessionUser = useSelector(state => state.session.user)

    if(sessionUser) return (
        <Redirect to='/' />
    )

    return (
        <div className='splash-container'>
         <SplashNavigation />
         <SplashImage />
         <Footer />
        </div>
    )
}


export default SplashPage
