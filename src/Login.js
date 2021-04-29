import React from 'react'
import { Container } from "react-bootstrap"
import styled from "styled-components";
import bg from './assets/bg.png'
import Header from './Header'
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=10f55f4a0aa043e5a3983ab8810cd18d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


const AppContainer = styled.div`
background-size:cover;
height:100vh;
background-image: url(${bg});

.btn{
    background-color:black;
    border:none;
}
.btn:hover{
    background-color:#343434;
}
`

export default function Login() {
    return (
        <AppContainer>
        <Header />
        <div className="login">
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <a className="btn btn-success btn-lg" href={AUTH_URL}>Login with Spotify</a>
            </Container>
        </div>
        </AppContainer>
    )
}
