import React from 'react'
import styled from "styled-components";

const HeaderComponent = styled.div`
height:10vh;
grid-column: 1/6;
z-index:0;

a{
    font-size:80px;
    font-weight:bold;
    background:transparent;
    color: black;
    line-height:1;
    text-decoration:none;
}

a:hover{
    background:transparent;
}
`


export default function Header() {
    return (
        <HeaderComponent>
            <a href="/">Play:</a> 
        </HeaderComponent>
    )
}
