import client from "../client";
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { COLORS } from "../styles/colors";

const LinkStyles = styled.li`
    margin: 0;
    padding: 0;
    width: 25%;
    height: auto;

    @media screen and (max-width: 950px) {
        width: 50%;
    }

    @media screen and (max-width: 600px) {
        width: 100%;
    }

    figure {
        position: relative;
        margin: 0 0 16px 0;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
    }

    .hover-fill {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition-duration: .5s;
    }

    a {
        position: relative;
        display: block;
        margin: 0;
        width: 100%;
        height: auto;
        padding: 12px;
        text-decoration: none;
        color: #333333;
        cursor: pointer;

        &:hover .hover-fill {
            opacity: .7;
        }
    }

    h3 {
        margin: 0 0 6px 0;
        font-size: 2.4em;
        line-height: 1;
    }
`;

function urlFor (source) {
    return imageUrlBuilder(client).image(source)
}

export default function HomeServiceLink({image, title, textBlock}) {
    const text = textBlock[0].children[0].text;
    const linkHref = title.toLowerCase().replace(/ /g, "");

    const colorFinder = (serviceTitle) => {
        let servicetext = serviceTitle ? serviceTitle.toLowerCase().replace(/ /g, "") : null;
        if (servicetext === 'tutoring') {
            return `${COLORS.tutorPrimary}`;
        } else if (servicetext === 'shepherding') {
            return `${COLORS.shepherdPrimary}`;
        } else if (servicetext === 'testprep') {
            return `${COLORS.testPrimary}`;
        } else if (servicetext === 'educationalconsulting') {
            return `${COLORS.educationPrimary}`;
        } else {
            return `${COLORS.primaryBlue}`;
        }  
    } 
    
    return (
        <LinkStyles >
            <Link href={linkHref === 'educationalconsulting' ? '/consulting' : `/${linkHref}`}>
                <a>
                    <figure>
                        <Image src={urlFor(image).url()} alt="Page Image" layout="fill" />
                        <div className="hover-fill" style={{backgroundColor: colorFinder(linkHref)}} />
                    </figure>
                    <h3 style={{color: colorFinder(linkHref)}}>{title}</h3>
                    <p>{text}</p>
                </a>
            </Link>
        </LinkStyles>
    )
}
