import React from 'react'
import styled from "styled-components";
import bg from './assets/bg.png'
import Header from './Header'
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=10f55f4a0aa043e5a3983ab8810cd18d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


const AppContainer = styled.div`
background-size:cover;
height:100vh;
background-image: url(${bg});


.login{
    width:100vw;
    height:90vh;
    display:flex;
    align-items:center;
    justify-content:center;
}

.loginBtn{
    background-color:black;
    border:none;
    color:white;
    border-radius:10px;
    padding: 12px 40px;
    text-decoration:none;
}
.loginBtn h2{
    font-weight:400;
    font-size:24px;
    margin:0;
}
.loginBtn:hover{
    background-color:#343434;
    outline:none;
}
.loginBtn:focus{
    box-shadow: 0 0 0 0.2rem rgb(248 190 175 / 80%);
}

`

export default function Login() {
    return (
        <AppContainer>
        <Header />
        <div className="login">
            <a className="loginBtn" href={AUTH_URL}><h2>Login with Spotify</h2></a>
        </div>
        </AppContainer>
    )
}
