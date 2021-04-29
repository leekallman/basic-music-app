import React from 'react'
import styled from "styled-components";
import Info from './Info';
import News from './News';

const SidebarComponent = styled.div`
grid-column:5/6;
z-index:2;

.open{
    height: max-content;
}

.closed{
    height: 60px;
}
`
export default function Sidebar() {
    return (
        <SidebarComponent>
            <Info />
            <News />
        </SidebarComponent>
    )
}
