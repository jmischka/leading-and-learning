import { useState } from 'react';
import { useRouter } from 'next/router';
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
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Header = styled.div`
    position: relative;
    margin: 0;
    width: calc(100%/12 * 4);
    height: auto;
    padding: 25px 0;

    h2 {
        margin: 0 0 25px;
        font-size: 4.3em;
        line-height: 1;
    }

    @media screen and (max-width: 1000px) {
        width: 100%;
    }

    @media screen and (max-width: 800px) {
        h2 {
            font-size: 3em;
        }
    }
`;

const FormStyles = styled.form`
    position: relative;
    margin: 0;
    width: calc((100%/12 * 6) + 19px);
    height: auto;
    padding: 0 0 50px;

    @media screen and (max-width: 1000px) {
        width: 100%;
    }

    label {
        display: block;
        margin: 25px 0 0;
        font-size: 1.6em;
        line-height: 1;
        text-transform: uppercase;
    }

    input {
        margin: 6px 0;
        width: 100%;
        height: auto;
        font-size: 1.6em;
        padding: 6px;
    }

    textarea {
        margin: 6px 0;
        width: 100%;
        font-size: 1.6em;
        line-height: 1.3;
        padding: 6px;
    }

    button {
        margin: 35px 0 0;
        font-family: 'AvenirNextLTW02', -apple-system, Helvetica Neue, sans-serif;
        padding: 12px;
        width: 100px;
        font-size: 1.4em;
        border: none;
        background-color: transparent;
        cursor: pointer;
        border: 1px solid;
        text-transform: uppercase;
        transition: .3s;
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
        height: auto;
        padding: 25px 0;
    }

    div.footer-navigation {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        width: calc((100%/12 * 6) + 19px);

        @media screen and (max-width: 800px) {
            width: 100%;
        }

        ul {
            margin: 0 0 0 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            list-style-type: none;
            height: 100px;
            padding: 0;

            @media screen and (max-width: 1000px) {
                margin: 0 0 50px 0;
                width: 50%;
            }
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
    }

    div.branding {
        position: relative;
        margin: 0;
        width: 200px;

        @media screen and (max-width: 1000px) {
            display: none;
        }

        a {
            display: block;
            margin: 0;
            width: 200px;
            height: auto;
            text-decoration: none;
            cursor: pointer;
        }
    }
`;

const SocialMediaWrapper = styled.div`
    position: relative;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
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
        a, span {
            display: inline-block;
            margin: 0 6px;
            font-size: 2em;
            line-height: 1;
            color: white;
            text-decoration: none;
            cursor: pointer;
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

function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
}

export default function Footer({primaryColor}) {
    const router = useRouter();
    const [inputs, setInputs] = useState({name: '', email: '', subject: '', message: ''});

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        fetch('/L&L_FAVICON.png', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': form.getAttribute('name'),
            ...inputs,
          }),
        })
          .then(() => router.push('/success'))
          .catch((error) => alert(error))
    }

    const handleMouseEnter = (e) => {
        let button = e.target;
        button.style.backgroundColor = 'transparent';
        button.style.color = primaryColor;
        
    }

    const handleMouseLeave = (e) => {
        let button = e.target;
        button.style.backgroundColor = primaryColor;
        button.style.color = 'white';
    }

    return (
        <>
            <div className="content-wrapper">
                <FlexContainer>
                    <Header>
                        <h2 style={{color: primaryColor}}>Need More Info?</h2>
                        <p>Contact us about your needs, our availability, process and fees.</p>
                    </Header>
                    <FormStyles name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleFormSubmit}>
                        <input type="hidden" name="form-name" value="contact" />
                        <label style={{color: primaryColor}}>Name</label>
                        <input type="text" name="name" onChange={handleInputChange} value={inputs.name} required />

                        <label style={{color: primaryColor}}>Your Email</label>
                        <input type="email" name="email" onChange={handleInputChange} value={inputs.email} required />

                        <label style={{color: primaryColor}}>Subject</label>
                        <input type="text" name="subject" onChange={handleInputChange} value={inputs.subject} required />

                        <label style={{color: primaryColor}}>Your Message</label>
                        <textarea name="message" rows='10' onChange={handleInputChange} value={inputs.message} />

                        <button type="submit" style={{borderColor: primaryColor, backgroundColor: primaryColor, color: 'white'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Submit</button>
                    </FormStyles>
                </FlexContainer>
            </div>
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
                            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/leadingandlearninginc"><FaFacebookF /></a>
                            <a target="_blank" rel="noreferrer" href="https://twitter.com/LL_tutoring"><FaTwitter /></a>
                        </div>
                    </SocialMediaWrapper>
                </div>
            </FooterWrapper>
        </>
    )
}