import axios from 'axios';
import React, { useState, useEffect } from 'react'
import styled from "styled-components"

const PlaylistsComponent = styled.div`
background:white;
border-radius:10px;
padding:5%;
grid-column:1/2;
z-index:2;
height:60vh;
overflow-y: auto;

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
ul{
    list-style:none;
    padding-left:1vw;
}
li{
    margin-bottom:1vh;
}
li:hover{
    color:#FF8F73;
    transition: 0.3s ease-in-out;
}


.hide{
    display:none;
}

`
export default function Playlists({ accessToken }) {
    const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'
    const [playlists, setPlaylists] = useState(true)
    const [playlistsData, setPlaylistsData] = useState(true)

    const playlistsHandler = () => {
        setPlaylists(!playlists)
    };

    useEffect(() => {
        axios.get(PLAYLISTS_ENDPOINT, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
            .then((response) => {
                setPlaylistsData(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [accessToken])

    return (
        <PlaylistsComponent className={playlists ? 'closed' : 'open'}>
            <button onClick={playlistsHandler}>
                <h2>Playlists</h2>
                <h2>{playlists ? '+' : '-'}</h2>
            </button>
            <div className={playlists ? 'hide' : 'display'}>
                <hr />
                <ul>
                    {playlistsData?.items ? playlistsData.items.map((item) => <li key={item.id}>{item.name}</li>) : null}
                </ul>
            </div>
        </PlaylistsComponent >
    )
}
