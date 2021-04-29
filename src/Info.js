import React, { useState } from 'react'
import styled from "styled-components";

const InfoComponent = styled.div`
background:black;
border-radius:10px;
color:white;
padding:5%;
margin-bottom:2vh;

h2{
    font-size:28px;
    display:inline-block;
    margin:0;
    text-transform:uppercase;
}
button{
    width:100%;
    background:none;
    border:none;
    color:white;
    display:flex;
    justify-content:space-between;
}
p{
    font-size:16px;
}

a{
    color:#FF8F73;
}

hr{
    border-top: 1px solid white;
}
.hide{
    display:none;
}
`

export default function Info() {
    const [info, setInfo] = useState(true)
    const infoHandler = () => {
        setInfo(!info)
    }
    return (
        <InfoComponent className={info ? 'closed' : 'open'}>
            <button onClick={infoHandler}>
                <h2>Info</h2>
                <h2>+</h2>
            </button>
            <div className={info ? 'hide' : 'display'}>
            <hr/>
                <p>This is a basic music App built using <a href="https://developer.spotify.com/documentation/web-api/" title="link to spotify documentation">Spotify Web API</a>, <a href="https://www.npmjs.com/package/axios" title="link to axios npm">axios</a> (promise based HTTP client for the browser and node.js), <a href="https://www.npmjs.com/package/react-spotify-web-playback" title="link to react-spotify-web-playback npm">react-spotify-web-playback</a> and <a href="https://threejs.org/" title="link to three.js">three.js</a>(JavaScript 3D library).</p>
                <p>Login with your Spotify Premium account. Search for your favorite songs/artists and play music right in your browser. As a cherry on the top, song lyrics are provided.</p>
                <p>It is a Hyper Island student project with the aim to build an App using at least 2 API:s.</p>
                <p><a href="https://github.com/leekallman/basic-music-app"> --> Github repo</a></p>
            </div>
        </InfoComponent>
    )
}
