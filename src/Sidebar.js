import React, { useState } from 'react'
import styled from "styled-components";
import Info from './Info';
import News from './News';

const SidebarComponent = styled.div`
grid-column:5/6;
z-index:2;

// .open{
//     height: max-content;
// }

.closed{
    height: 60px;
}
`
export default function Sidebar() {
    const [info, setInfo] = useState(true)
    const infoHandler = () => {
        setInfo(!info)
    }
    return (
        <SidebarComponent>
            <Info info={info} setInfo={setInfo} infoHandler={infoHandler} />
            <News info={info} setInfo={setInfo} />
        </SidebarComponent>
    )
}
