import React, { useState, useEffect } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"
import styled from "styled-components";

const PlayerComponent = styled.div`
._SliderRSWP {
    margin-bottom:20px;
}
`

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => 
        setPlay(true), [trackUri])

    if(!accessToken) return null

    return (
        <PlayerComponent>
        <SpotifyPlayer 
    token={accessToken}
    showSaveIcon
    callback={state => {
        if (!state.isPlaying) setPlay(false)
    }}
    play={play}
    uris={trackUri ? [trackUri] : []}
    styles={{
        activeColor: '#fff',
        color:'yellow',
        bgColor: 'none',
        loaderColor: 'black',
        loaderSize: '50px',
        sliderColor: 'yellow',
        sliderTrackBorderRadius: 5,
        sliderHeight:'5px',
        sliderTrackColor:'#ffffff',
        trackNameColor:'yellow',
        trackArtistColor: 'yellow',
    }}
    />
        </PlayerComponent>
    )
    
    
}
