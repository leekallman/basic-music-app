import React, { useState, useEffect } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

// const PlayerComponent = styled.div`
// width:100vw;
// height:10vh;
// `




export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => 
        setPlay(true), [trackUri])

    if(!accessToken) return null

    return <SpotifyPlayer 
    token={accessToken}
    showSaveIcon
    callback={state => {
        if (!state.isPlaying) setPlay(false)
    }}
    play={play}
    uris={trackUri ? [trackUri] : []}
    styles={{
        activeColor: '#fff',
        color:'black',
        bgColor: 'none',
        loaderColor: 'black',
        loaderSize: '50px',
        sliderColor: 'yellow',
        sliderTrackBorderRadius: 3,
        sliderHeight:'5px',
        sliderTrackColor:'#ffffff',
        trackArtistColor: '#343434',
    }}
    />
}
