import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginForm from "../../auth/LoginForm";
import SignUpForm from "../../auth/SignUpForm";
import LogPageHeader from "./header";
import Footer from "../Footer";

import './Login.css'

function LoginPage({page}) {

    const sessionUser = useSelector(state => state.session.user)

    if(sessionUser) return (
        <Redirect to='/' />
    )

    if (page === 'login') {
        return (
            <div className='login-container'>
                <LogPageHeader />
                <LoginForm />
                <Footer />

            </div>
        )
    }

    else if (page === 'signup') {
        return (
            <div className='login-container'>
                <LogPageHeader />
                <SignUpForm />
                <Footer />
            </div>
        )
    }

    else if (page === 'nothing') {
        return (
            <div className='login-container'>
                <LogPageHeader />
                <div className='form-main'>
                    <h1>Whelp! There's nothing here.</h1>
                </div>
                <Footer />
            </div>
        )
    }
}


export default LoginPage
