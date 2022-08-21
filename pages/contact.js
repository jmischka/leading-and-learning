import { useState } from 'react';
import { useRouter } from 'next/router';
import client from "../client";
import { COLORS } from "../styles/colors";
import styled from "styled-components";
import QuestionMarks from '../assets/Questionmarks.png';
import contactGif from '../assets/contact.gif';
import Image from "next/image";
import AlternateFooter from "../components/alternateFooter";

const Background = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${COLORS.primaryBlue};
    opacity: .2;
    z-index: -100;
`;

const ImageStyles = styled.div`
    position: absolute;
    margin: 0;
    left: 50%;
    bottom: 375px;
    width: 100%;
    max-width: 1450px;
    transform: translateX(-50%);
    
    figure {
        display: block;
        position: absolute;
        margin: 0;
        left: -185px;
        bottom: 0;
        width: 850px;
        height: 250px; 
    }

    @media screen and (max-width: 800px) {
        figure {
            display: none;
        }
    }
`;

const ContactStyles = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1450px;
    height: auto;
    padding: 100px 0 75px; 

    h2 {
        margin: 0 0 25px 0;
        font-size: 6em;
        color: ${COLORS.primaryBlue};
    }

    @media screen and (max-width: 800px) {
        h2 {
            margin: 0 0 0 0;
            font-size: 4.2em;
        }
    }
`;

const FlexWrapper = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    div {
        margin: 0;
        width: calc(50% - 19px);
        height: auto;
        padding: 25px;
    }

    @media screen and (max-width: 800px) {
        div {
            width: 100%;
        }
    }
`;

const FormStyles = styled.form`
    position: relative;
    width: 100%;
    height: auto;

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
        outline: none;
        border: none;
    }

    textarea {
        margin: 6px 0;
        width: 100%;
        font-size: 1.6em;
        line-height: 1.3;
        padding: 6px;
        outline: none;
        border: none;
    }

    button {
        margin: 35px 0 0;
        padding: 12px;
        width: 100px;
        font-size: 1.4em;
        border: none;
        background-color: ${COLORS.primaryBlue};
        border: 1px solid ${COLORS.primaryBlue};
        cursor: pointer;
        transition: .3s;
        text-transform: uppercase;
        color: #FFFFFF;

        &:hover {
            background-color: transparent;
            color: ${COLORS.primaryBlue};
        }
    }
`

function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
}

function Contact({contactData}) {
    const contactText = contactData[0].copy[0].children[0].text;
    const [inputs, setInputs] = useState({name: '', email: '', subject: '', message: ''});
    const router = useRouter();

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

    return (
        <>
            <main>
                <Background />
                <ImageStyles>
                    <figure>
                        <Image src={contactGif} alt="Graphic" unoptimized={true} />
                    </figure>
                </ImageStyles>
                <ContactStyles>
                    <FlexWrapper>
                        <div>
                            <h2>{contactData[0].headline}</h2>
                            <p>{contactText}</p>
                        </div>
                        <div>
                            <FormStyles name="contact-page" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleFormSubmit}>
                                <input type="hidden" name="form-name" value="contact-page" />
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleInputChange} value={inputs.name} required />
                                <label>Your Email</label>
                                <input type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
                                <label>Subject</label>
                                <input type="text" name="subject" onChange={handleInputChange} value={inputs.subject} required />
                                <label>Your Message</label>
                                <textarea name="message" rows='10' onChange={handleInputChange} value={inputs.message} />
                                <button type="submit">Submit</button>
                            </FormStyles>
                        </div>
                    </FlexWrapper>
                </ContactStyles>
            </main>
            <AlternateFooter />
        </>
    )
}

export async function getStaticProps() {
    const contactData = await client.fetch(`*[_type == 'contactPage']`)
    return {
      props: {
        contactData,
      },
    }
  }

export default Contact;