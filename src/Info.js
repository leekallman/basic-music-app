import React from 'react'
import styled from "styled-components";

const InfoComponent = styled.div`
width:100%;
height:60px;
background:black;
border-radius:10px;
color:white;
display:flex;
justify-content:space-between;
padding:2%;
align-items:center;

h2{
    display:inline-block;
    margin:0;
}
button{
    background:none;
    border:none;
    color:white;
}
`
export default function Info() {
    return (
        <InfoComponent>
            <h2>INFO</h2>
            <button><h2>+</h2></button>
        </InfoComponent>
    )
}
