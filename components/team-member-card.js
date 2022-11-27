import client from "../client";
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";
import styled from "styled-components";
import { COLORS } from "../styles/colors";

const CardStyles = styled.li`
    position: relative;
    margin: 0 1.333% 1.333% 0;
    width: 32%;
    height: auto;
    padding: 25px;
    background-color: white;
    cursor: pointer;
    transition-duration: .35s;
    &:hover {
        z-index: 10;
        box-shadow: 5px 5px 30px rgba(0,0,0,.15);
        transform: translateY(-7px);
    }

    figure {
        position: relative;
        margin: 0;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
    }

    @media screen and (max-width: 1000px) {
        width: 48%;
        margin: 0 2% 2% 0;
    }

    @media screen and (max-width: 700px) {
        width: 100%;
        margin: 0 0 2% 0;
    }
`;

const LeaderName = styled.span`
    display: block;
    margin: 25px 0 0;
    font-size: 2em;
    line-height: 1.3;
    text-transform: uppercase;
    text-align: center;
    color: ${props => props.category === 'tutoring' 
        ? COLORS.tutorPrimary
        : props.category === 'shepherding'
        ? COLORS.shepherdPrimary
        : props.category === 'educationalconsulting'
        ? COLORS.educationPrimary
        : props.category === 'testprep'
        ? COLORS.testPrimary
        : COLORS.primaryBlue
    };
`;

const LeaderTitle = styled.span`
    display: block;
    margin: 0;
    font-size: 1.6em;
    line-height: 1.3;
    text-transform: uppercase;
    text-align: center;
`;

const ClickTarget = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

function urlFor (source) {
    return imageUrlBuilder(client).image(source)
}

function TeamMemberCard({ portrait, category, name, title, index, handleTeamMemberClick }) {
    return (
        <CardStyles>
            <figure>
                <Image src={urlFor(portrait).url()} alt="Portrait" layout="fill" />
            </figure>
            <LeaderName category={category}>{name}</LeaderName>
            <LeaderTitle>{title}</LeaderTitle>
            <ClickTarget data-member={`member-${index}`} onClick={handleTeamMemberClick} />
        </CardStyles>
    )
};

export default TeamMemberCard;