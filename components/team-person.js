import client from "../client";
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";
import styled from "styled-components";
import { COLORS } from "../styles/colors";

const Person = styled.div`
    position: fixed;
    left: 0;
    top: 100%;
    width: 100%;
    height: calc(100vh - 115px);
    padding: 25px 0 0;
    background-color: white;
    transition-duration: .7s;
    transition-timing-function: cubic-bezier(0.01, 0, 0.17, 1.01);
    z-index: 100;
    &.activated {
        top: 115px;
    }

    @media screen and (max-width: 780px) {
        height: calc(100vh - 90px);
        &.activated {
            top: 90px;
        }
    }
`;

const CloseButton = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1450px;
    height: auto;
    padding: 20px 20px 30px;

    button {
        position: absolute;
        right: 25px;
        top: 0;
        width: 35px;
        height: 35px;
        border: none;
        transition-duration: .5s;
        background: transparent;
        cursor: pointer;
        opacity: .5;
        &:hover {
            opacity: 1;
        }

        span {
            display: block;
            position: absolute;
            width: 35px;
            height: 3px;
            left: 50%;
            top: 50%;
            background-color: ${COLORS.primaryBlue};
            &:nth-child(1) {
                transform: translate(-50%,-50%) rotate(45deg);
            }
            &:nth-child(2) {
                transform: translate(-50%,-50%) rotate(-45deg);
            }
        }
    }
`;

const PersonWindow = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: 70vh;
    overflow-x: hidden;
    overflow-y: scroll;
`;

const PersonWrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 1450px;
    height: auto;
    padding: 0 0 75px;
`;

const PersonContent = styled.div`
    position: relative;
    margin: 0;
    width: 45%;
    height: auto;
    padding: 25px;
    order: 1;

    p {
        margin: 0 0 24px;
        font-style: normal;
        &:last-child {
            margin: 0 0 0;
        }
    }

    .ital {
        font-style: italic;
    }

    @media screen and (max-width: 950px) {
        width: 100%;
        order: 2;
    }
`;

const PersonPortrait = styled.div`
    position: relative;
    margin: 0;
    width: 53.5%;
    height: auto;
    padding: 25px;
    order: 2;

    figure {
        position: relative;
        margin: 0;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
    }

    @media screen and (max-width: 950px) {
        width: 100%;
        order: 1;
    }
`;

const PersonName = styled.span`
    display: block;
    margin: 0;
    font-size: 4.3em;
    line-height: 1.3;
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

const PersonTitle = styled.span`
    display: block;
    margin: 0;
    font-size: 1.8em;
    line-height: 1.5;
`;

const Spacer = styled.div`
    margin: 35px 0;
    width: 35px;
    height: 3px; 
    background-color: ${props => props.category === 'tutoring' 
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

function urlFor (source) {
    return imageUrlBuilder(client).image(source)
}

function TeamPerson({ portrait, category, name, title, bio, identifier, allTeamMembers, closePerson }) {
    return (
        <Person className={!allTeamMembers ? null : allTeamMembers[identifier] ? 'activated' : null}>
            <CloseButton>
                <button onClick={closePerson}>
                    <span />
                    <span />
                </button>
            </CloseButton>
            <PersonWindow>
                <PersonWrapper>
                    <PersonContent>
                        <PersonName category={category}>{name}</PersonName>
                        <PersonTitle>{title}</PersonTitle>
                        <Spacer category={category} />
                        {bio.map((article,idx) => 
                            <p key={idx}>{article.children.map(child => 
                            child.marks[0] === 'em' ? <span className="ital">{child.text}</span> : child.text)}</p>)
                        }
                    </PersonContent>
                    <PersonPortrait>
                    <figure>
                        <Image src={urlFor(portrait).url()} alt="Portrait" layout="fill" />
                    </figure>
                    </PersonPortrait>
                </PersonWrapper>
            </PersonWindow>
        </Person>
    )
};

export default TeamPerson;