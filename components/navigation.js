import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Branding from '../public/L&L_LOGO.jpg'
import styled, { keyframes } from 'styled-components';
import { COLORS } from '../styles/colors';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const NavStyles = styled.nav`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    max-width: 1450px;
    height: auto;
    padding: 16px 0 9px;

    div.branding {
        display: block;
        position: relative;
        margin: 0;
        width: 250px;
        height: auto;
        padding: 0 25px;
        text-decoration: none;

        a {
            text-decoration: none;
            cursor: pointer;
        }
    }

    img {
        margin: 0;
        width: 100%;
        height: auto;
    }

    .wrapper {
        margin: 0;
        position: relative;
        width: calc((100%/12) * 6.5);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 25px 0 0;
    }

    ul.main-navigation {
        position: relative;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        list-style-type: none;
        padding: 0;

        @media screen and (max-width: 800px) {
            display: none;
            visibility: hidden;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            background-color: white;
            z-index: 100;
            opacity: 0;
            transition-duration: .5s;
            animation: .5s ${fadeIn} ease-out;

            &.active {
                display: flex;
                visibility: visible;
                opacity: 1;
            }
        }
    }

    .mobile-menu-button {
        display: none;
        position: absolute;
        top: 50%;
        right: 25px;
        width: 32px;
        height: 22px;
        transform: translateY(-55%);
        cursor: pointer;

        span {
            position: absolute;
            left: 0;
            width: 100%;
            height: 5px;
            background-color: var(--primaryBlue);
            border-radius: 3px;

            :nth-child(1) {
                top: 0;
            }
            :nth-child(2) {
                top: 9px;
            }
            :nth-child(3) {
                top: 18px;
            }
        }

        @media screen and (max-width: 780px) {
            display: block;
        }
    }

    a.client-portal-link {
        display: block;
        position: absolute;
        right: 25px;
        top: -1px;
        width: 150px;
        text-decoration: none;
        font-size: 1.6em;
        line-height: 1;
        text-transform: uppercase;
        text-align: center;
        padding: 6px;
        background-color: var(--primaryBlue);
        border: 1px solid var(--primaryBlue);
        color: white;
        cursor: pointer;

        &:hover {
            background-color: white;
            font-weight: 600;
            color: var(--primaryBlue);
        }

        @media screen and (max-width: 780px) {
            display: none;
        }
    }

    li {
        position: relative;
        margin: 0;
        padding: 0;
        width: 20%;
        height: auto;
        max-width: 140px;
        text-align: center;

        @media screen and (max-width: 780px) {
            width: 100%;
            max-width: 100%;
        }

        &:nth-child(5) a {
            text-align: right;

            @media screen and (max-width: 780px) {
                text-align: center;
            }
        }

        &.client-portal-link-mobile {
            display: none;
            text-align: center;

            a {
                margin: 25px auto 0;
                padding: 6px;
                width: 150px;
                background-color: var(--primaryBlue);
                border: 1px solid var(--primaryBlue);
                color: white;
            }

            @media screen and (max-width: 780px) {
                display: block;
            }
        }

        a, 
        span {
            display: block;
            text-decoration: none;
            font-size: 1.8em;
            line-height: 1;
            text-transform: uppercase;
            text-align: center;
            color: ${COLORS.primaryBlue};
            padding: 0 0;
            cursor: pointer;
            transition: .3s;
            &:hover {
                font-size: 1.9em;
                color: black;
            }

            @media screen and (max-width: 780px) {
                padding: 12px 0;
            }
        }

        .sub-menu {
            position: absolute;
            left: 50%;
            top: 100%;
            margin: 0;
            width: 140%;
            height: auto;
            list-style-type: none;
            padding: 9px 0 0 0;
            background: white;
            transform: translate(-50%,10%);
            visibility: hidden;
            opacity: 0;
            transition-duration: .3s;
            transition-timing-function: ease-in-out;

            @media screen and (max-width: 780px) {
                display: block;
                position: relative;
                visibility: visible;
                left: 0;
                top: 0;
                width: 100%;
                transform: translate(0,0);
                opacity: 1;
                padding: 9px 0 9px 0;
            }

            li {
                position: relative;
                margin: 0;
                width: 100%;
                max-width: none;
                height: auto;
                padding: 0;
                text-align: center;

                a {
                    display: block;
                    width: 100%;
                    height: auto;
                    padding: 9px 9px 9px 9px;
                    font-size: 1.5em;
                    line-height: 1;
                    text-transform: uppercase;
                    text-align: center;
                    color: var(--primaryBlue);
                    &:hover {
                        background: var(--blueBackground);

                        @media screen and (max-width: 780px) {
                            color: black;
                        }
                    }
                }

                &:last-child a {
                    padding: 9px 9px 18px 9px;
                    @media screen and (max-width: 780px) {
                        padding: 9px 9px 9px 9px;
                    }
                }
            }
        }

        &:hover .sub-menu {
            visibility: visible;
            opacity: 1;
            transform: translate(-50%,0);

            @media screen and (max-width: 780px) {
                transform: translate(0,0);
            }
        }
    }
`

function Navigation() {
    const [mobileActive, setMobileActive] = useState(false);

    const handleMobileClick = () => {
        setMobileActive(!mobileActive);
    }

    const handleNavLinkClick = () => {
        setTimeout(() => {
            setMobileActive(!mobileActive);
        }, 1000)   
    }

    return (
        <NavStyles>
            <div className="branding">
                <Link href="/">
                    <a><Image src={Branding} alt="branding" priority /></a>
                </Link>
            </div>
            <div className="wrapper">
                <ul className={mobileActive ? "main-navigation active" : "main-navigation"}>
                    <li onClick={handleNavLinkClick}><Link href="/about"><a>About</a></Link></li>
                    <li>
                        <span>Services</span>
                        <ul className="sub-menu">
                            <li onClick={handleNavLinkClick}><Link href="/tutoring"><a>Tutoring</a></Link></li>
                            <li onClick={handleNavLinkClick}><Link href="/testprep"><a>Test Prep</a></Link></li>
                            <li onClick={handleNavLinkClick}><Link href="/shepherding"><a>Shepherding</a></Link></li>
                            <li onClick={handleNavLinkClick}><Link href="/consulting"><a>Educational Consulting</a></Link></li>
                        </ul>
                    </li>
                    <li onClick={handleNavLinkClick}><Link href="/blog"><a>Blog</a></Link></li>
                    <li onClick={handleNavLinkClick}><Link href="/careers"><a>Careers</a></Link></li>
                    <li onClick={handleNavLinkClick}><Link href="/contact"><a>Contact</a></Link></li>
                    <li className='client-portal-link-mobile'><a target="_blank" rel="noreferrer" href="https://leadingandlearning.com/LL/user/login">Client Portal</a></li>
                </ul>
                <div className="mobile-menu-button" onClick={handleMobileClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <a className='client-portal-link' target="_blank" rel="noreferrer" href="https://leadingandlearning.com/LL/user/login">Client Portal</a>
        </NavStyles>
    )
}

export default Navigation;