import React from 'react'
import styled from "styled-components";
import Info from './Info';

const SidebarComponent = styled.div`
grid-column:5/6;
dispay: grid;
grid-template-column:
`
export default function Sidebar() {
    return (
        <SidebarComponent>
            <Info />
        </SidebarComponent>
    )
}
