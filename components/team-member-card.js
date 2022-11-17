import client from "../client";
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";
import styled from "styled-components";
import { COLORS } from "../styles/colors";

const CardStyles = styled.li`
    position: relative;
    margin: 0;
    width: 33.333%;
    height: auto;
    padding: 25px;
    cursor: pointer;

    figure {
        position: relative;
        margin: 0;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
    }

    @media screen and (max-width: 1000px) {
        width: 50%;
    }

    @media screen and (max-width: 700px) {
        width: 100%;
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