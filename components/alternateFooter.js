import Link from "next/link";
import Image from 'next/image';
import Branding from '../public/L&L_LOGO_WHITE.png'
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const FlexContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
`;

const FooterWrapper = styled.div`
    margin: 0;
    width: 100%;
    height: auto;
    padding: 25px 0;
    background-color: ${COLORS.primaryBlue};

    div.branding,
    div.footer-navigation {
        position: relative;
        margin: 0;
        width: calc(50% - 19px);
        height: auto;

        @media screen and (max-width: 800px) {
            width: 100%;
        }
    }

    div.footer-navigation {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;

        ul {
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            list-style-type: none;
            height: 100px;
            padding: 0;
            display: flex;
        }

        a,
        span {
            display: block;
            margin: 0;
            font-size: 1.6em;
            line-height: 1.4;
            color: #FFFFFF;
            text-decoration: none;
            cursor: pointer;
        }

        a {
            &:hover {
                text-decoration: underline;
            }
        }

        @media screen and (max-width: 800px) {
            ul {
                margin: 0 0 50px 0;
                width: 50%;
            }
        }
    }

    div.branding {
        position: relative;
        margin: 0;

        a {
            display: block;
            margin: 0;
            width: 200px;
            height: auto;
            text-decoration: none;
            cursor: pointer;
        }

        @media screen and (max-width: 800px) {
            display: none;
        }
    }
`;

const SocialMediaWrapper = styled.div`
    position: relative;
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    height: auto;

    div.copyright {
        order: 1;
        span {
            display: block;
            font-size: 1em;
            line-height: 1;
            color: white;
            text-transform: uppercase;
        }
    }

    div.social {
        order: 2;
        span {
            display: inline-block;
            margin: 0 6px;
            font-size: 2em;
            line-height: 1;
            color: white;
        }
    }

    @media screen and (max-width: 800px) {
        div.copyright {
            order: 2;
            width: 100%;
        }

        div.social {
            order: 1;
            width: 100%;
            padding: 0 0 12px 0;
        }
    }
`;

export default function AlternateFooter() {
    return (
        <>
            <FooterWrapper>
                <div className="content-wrapper">
                    <FlexContainer>
                        <div className="branding">
                            <Link href="/">
                                <a><Image placeholder="blur" alt="branding" src={Branding} /></a>
                            </Link>
                        </div>
                        <div className="footer-navigation">
                            <ul>
                                <li><Link href="/about"><a>About</a></Link></li>
                                <li><Link href="/blog"><a>Blog</a></Link></li>
                                <li><Link href="/careers"><a>Careers</a></Link></li>
                                <li><a target="_blank" rel="noreferrer" href="https://leadingandlearning.com/LL/user/login">Client Portal</a></li>
                            </ul>
                            <ul>
                                <li><Link href="/tutoring"><a className="service-link">Tutoring</a></Link></li>
                                <li><Link href="/testprep"><a className="service-link">Test Prep</a></Link></li>
                                <li><Link href="/shepherding"><a className="service-link">Shepherding</a></Link></li>
                                <li><Link href="/consulting"><a className="service-link">Educational Consulting</a></Link></li>
                            </ul>
                            <ul>
                                <li><span>305.856.1194</span></li>
                                <li><span>info@leadingandlearning.com</span></li>
                                <li><span>1825 Ponce de Leon Blvd. #128</span></li>
                                <li><span>Coral Gables, FL 33134</span></li>
                            </ul>
                        </div>
                    </FlexContainer>
                    <SocialMediaWrapper>
                        <div className="copyright">
                            <span>&copy; 2022 Leading & Learning</span>
                        </div>
                        <div className="social">
                            <span><FaInstagram /></span>
                            <span><FaFacebookF /></span>
                            <span><FaTwitter /></span>
                        </div>
                    </SocialMediaWrapper>
                </div>
            </FooterWrapper>
        </>
    )
}