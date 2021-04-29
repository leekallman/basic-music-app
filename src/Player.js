import React, { useState, useEffect } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"

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
        sliderTrackBorderRadius: 5,
        sliderHeight:'5px',
        sliderTrackColor:'#ffffff',
        trackArtistColor: '#343434',
    }}
    />
}
