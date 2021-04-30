import { useState, useEffect } from 'react'
import useAuth from './useAuth';
import { Form } from 'react-bootstrap'
import styled from "styled-components";
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'
import axios from 'axios';
import Header from './Header'
import Sidebar from './Sidebar'
import Playlists from './Playlists'
import Torus from './Torus'
import bg from './assets/bg.png'

const AppContainer = styled.div`
height:100vh;
background-size:cover;
background-image: url(${bg});
display:grid;
grid-template-columns: repeat(5, 19%);
grid-gap:1%;
padding:1%;
position:relative;

.form-control{
    border:none;
    border-radius:10px;
    padding: 6px 12px;
}
.form-control:focus{
    box-shadow: 0 0 0 0.2rem rgb(248 190 175 / 80%);
}

input::placeholder {
    color:white;
}

.lyrics{
    height:60vh;
    overflow-y: scroll;
    padding-left:1vw;
}

.searchResults{
    height:60vh;
    overflow-y: scroll;
    margin-top: 2vh;
}
.node{
    position:absolute;
    top:0;
}

.closed{
    height: 60px;
}
`
const Container = styled.div`
    grid-column: 2/5;
`
const spotifyApi = new SpotifyWebApi({
    clientId: "10f55f4a0aa043e5a3983ab8810cd18d",
})

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState('')

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

    useEffect(() =>{
        if(!playingTrack) return

        axios.get('http://localhost:3001/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res =>{
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    useEffect(() => { 
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return
        let cancel = false
        spotifyApi.searchTracks(search).then(res =>{
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track =>{
                
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return{
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url
                }
            }))
        })
        return() => cancel = true
    }, [search, accessToken])

    return (
        <AppContainer className="appContainer">
            <Header/>
            <Torus />
            <Playlists accessToken={accessToken}/>
            <Container className="" style={{zIndex: "1"}}>
                <Form.Control type="search"
                placeholder="Search Songs/Artists"
                size="lg"
                aria-label="Search songs/artists"
                value={search} 
                onChange={e => setSearch(e.target.value)}
                style={{backgroundColor:"black", 
                color:"white",
            height:"60px"}} 
                />
                <div className="searchResults">
                    {searchResults.map(track => (
                        <TrackSearchResult 
                        track={track} 
                        key={track.uri} 
                        chooseTrack={chooseTrack}
                        />
                    ))}
                    {searchResults.length === 0 && (
                    <div className="lyrics" style={{ whiteSpace: "pre"}}>
                    {lyrics}
                    </div>
                    )}
                </div>
                <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
            </Container>
            <Sidebar />
        </AppContainer>
    )
}
