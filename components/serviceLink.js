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

    figure {
        position: relative;
        margin: 0 0 22px 0;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
    }

    a {
        display: block;
        margin: 0;
        width: 100%;
        height: auto;
        padding: 12px;
        text-decoration: none;
        color: #333333;
    }

    h3 {
        margin: 0 0 12px 0;
        font-size: 3em;
        line-height: 1;
    }
`;

function urlFor (source) {
    return imageUrlBuilder(client).image(source)
}

export default function ServiceLink({image, title, textBlock}) {
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
        <LinkStyles>
            <Link href={linkHref === 'educationalconsulting' ? '/consulting' : `/${linkHref}`}>
                <a>
                    <figure>
                        <Image src={urlFor(image).url()} alt="Page Image" layout="fill" />
                    </figure>
                    <h3 style={{color: colorFinder(linkHref)}}>{title}</h3>
                    <p>{text}</p>
                </a>
            </Link>
        </LinkStyles>
    )
}
