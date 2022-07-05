import styled from "styled-components";
import Navigation from "./navigation";

const HeaderStyles = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    background: white;
    z-index: 100; 
`

function Header() {
    return (
        <HeaderStyles>
            <Navigation />
        </HeaderStyles>
    )
}

export default Header;