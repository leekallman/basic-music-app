import React, { useState } from 'react'
import styled from "styled-components";

const NewsComponent = styled.div`
background:white;
border-radius:10px;
justify-content:space-between;
padding:5%;

h2{
    font-size:28px;
    display:inline-block;
    margin:0;
    text-transform:uppercase;
    color:black;
}
button{
    width:100%;
    background:none;
    border:none;
    color:white;
    display:flex;
    justify-content:space-between;
}
hr{
    border-top: 1px solid black;
}
.hide{
    display:none;
}
`
export default function News({ info, setInfo }) {
    const [news, setNews] = useState(true)
    const newsHandler = () => {
        setNews(!news)
        if (info === false) {
            setInfo(true)
        }
    }


    return (
        <NewsComponent className={news ? 'closed' : 'open'}>
            <button onClick={newsHandler}>
                <h2>News</h2>
                <h2>{news ? '+' : '-'}</h2>
            </button>
            <div className={news ? 'hide' : 'display'}>
                <hr />
                <p>This is a very basic music App built using Spotify Web API, react-spotify-web-playback and Three.js</p>
                <p>It is a Hyper Island student project with the aim to build an App using at least 2 API:s.</p>
            </div>
        </NewsComponent>
    )
}
