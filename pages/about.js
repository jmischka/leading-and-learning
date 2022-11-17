import { useEffect, useState, useRef } from 'react';
import client from "../client";
import Footer from "../components/footer";
import Testimonial from "../components/testimonial";
import { COLORS } from "../styles/colors";
import styled from 'styled-components';
import HeroImage from "../components/heroImage";
import TeamMemberCard from '../components/team-member-card';
import TeamPerson from '../components/team-person';

const IntroStyles = styled.div`
    position: relative;
    margin: 100px auto 0;
    width: 100%;
    max-width: 1450px;

    h2 {
        margin: 0 0 0 0;
        font-size: 4.3em;
        color: ${COLORS.primaryBlue};
    }

    p {
        margin: 0 0 1.2em 0;
        font-size: 1.8em;
        &:last-child {
            margin: 0 0 0 0;
        }

        .em {
            font-style: italic;
        }

        .strong {
            font-weight: bold;
        }

        .underline {
            text-decoration: underline;
        }
    }

    @media screen and (max-width: 1000px) {
        h2 {
            margin: 0 0 0 0;
        }
    }

    @media screen and (max-width: 800px) {
        margin: 50px auto 0;

        h2 {
            font-size: 3em;
        }
    }
`;

const PurposeStyles = styled.div`
    position: relative;
    margin: 100px auto 0;
    width: 100%;
    max-width: 1450px;
    height: auto;

    h2 {
        margin: 0 0 0 0;
        font-size: 4.3em;
        padding: 0 25px;
        color: ${COLORS.primaryBlue};
    }

    ul {
        margin: 0 0 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;

        li {
            margin: 0;
            margin: 0 0 1.2em 0;
            font-size: 1.8em;
            line-height: 1.5;
            width: calc(50% - 19px);
            height: auto;
            padding: 0 25px;

            &:before {
                content: "";
                display: block;
                margin: 25px 0;
                width: 25px;
                height: 4px;
                background: ${COLORS.primaryBlue};
            }
        }

        @media screen and (max-width: 1000px) {
            li {
                width: 100%;
            }
        }
    }

    @media screen and (max-width: 800px) {
        margin: 50px auto 0;

        h2 {
            font-size: 3em;
        }
    }
`;

const TeamStyles = styled.div`
    position: relative;
    margin: 100px auto 0;
    width: 100%;
    max-width: 1450px;

    h2 {
        margin: 0 0 0 0;
        font-size: 4.3em;
        color: ${COLORS.primaryBlue};
    }

    p {
        margin: 0 0 12px 0;
        font-size: 1.8em;
        &:last-child {
            margin: 0 0 0 0;
        }

        .em {
            font-style: italic;
        }

        .strong {
            font-weight: bold;
        }

        .underline {
            text-decoration: underline;
        }
    } 

    @media screen and (max-width: 800px) {
        margin: 50px auto 0;

        h2 {
            font-size: 3em;
        }
    }
`;

const TeamMemberList = styled.ul`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 50px 0 0;
    padding: 0;
    width: 100%;
    height: auto;
    list-style-type: none;
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

    div.copy-blocks {
        padding: 35px 25px 25px;
    }

    @media screen and (max-width: 1000px) {
        div {
            width: 100%;
            padding: 0 25px;
        }
    }
`;

const VideoWrapper = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;

    video {
        position: relative;
        margin: 0;
        width: 100%;
        height: auto;
    }
`;

function About({aboutData, teamData}) {
    const pageTitle = aboutData[0].pageTitle
    const mainImage = aboutData[0].mainImage.asset;
    const introTitle = aboutData[0].intro;
    const introText = aboutData[0].introCopy;
    const purposeTitle = aboutData[0].purposeTitle;
    const purposeText = aboutData[0].purposeCopy;
    const testimonialData = aboutData[0].testimonial;
    const teamTitle = aboutData[0].teamIntroTitle;
    const teamCopy = aboutData[0].teamIntroCopy
    const teamMembers = teamData[0].teamMembers;

    const [isMobile, setIsMobile] = useState(true);
    const [allTeamMembers, setAllTeamMembers] = useState(null);
    const teamMemberDefaultState = useRef(null);
    
    useEffect(() => {
        let windowWidth = window.innerWidth;
        if (windowWidth > 800) {
            setIsMobile(false);
        }
    }, []);

    useEffect(() => {
        const memberArray = teamMembers.map((member,idx) => {
            return {
                [`member-${idx}`]: false,
            }
        });
        let obj = Object.assign(...memberArray);
        setAllTeamMembers(obj);
        teamMemberDefaultState.current = obj;
    }, [teamMembers]);

    const handleTeamMemberClick = (e) => {
        let member = {[e.target.dataset.member]: true};
        let newObj = Object.assign({}, teamMemberDefaultState.current, member);
        setAllTeamMembers(newObj);
    }

    const closePerson = () => {
        setAllTeamMembers(teamMemberDefaultState.current);
    }
    
    return (
        <>
            <main>
                {isMobile ? (
                    <HeroImage image={mainImage} />
                ) : (
                    <VideoWrapper>
                        <video src="/ABOUT2.mp4" autoPlay loop muted />
                    </VideoWrapper>
                )}
                <IntroStyles>
                    <FlexWrapper>
                        <div><h2>{introTitle}</h2></div>
                        <div className="copy-blocks">
                            {introText.map((copy,idx) => {
                                return (
                                    <p key={idx}>{copy.children.map((child,idx) => 
                                        <span key={idx} className={child.marks.length 
                                            ? child.marks.map(mark => mark).join(' ') 
                                            : null}>{child.text}</span>)}</p>
                                )
                            })}
                        </div>
                    </FlexWrapper>
                </IntroStyles>
                <PurposeStyles>
                    <h2>{purposeTitle}</h2>
                    <ul>
                        {purposeText.map((text,idx) => {
                            return (
                                <li key={idx}>{text.blockText[0].children[0].text}</li>
                            )
                        })}
                    </ul>
                </PurposeStyles>
                <Testimonial serviceTitle={pageTitle} testimonialData={testimonialData} />
                <TeamStyles>
                    <FlexWrapper>
                        <div>
                            <h2>{teamTitle}</h2>
                        </div>
                        <div className="copy-blocks">
                            {teamCopy.map((copy,idx) => {
                                return (
                                    <p key={idx}>{copy.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                                )
                            })}
                        </div>
                    </FlexWrapper>
                    <TeamMemberList>
                        {teamMembers.map((member, idx) => 
                            <TeamMemberCard 
                                key={idx} 
                                portrait={member.headshot} 
                                category={member.positionCategory} 
                                name={member.fullName} 
                                title={member.positionTitle} 
                                index={idx}
                                handleTeamMemberClick={handleTeamMemberClick}
                            />)}
                    </TeamMemberList>
                </TeamStyles>
                {teamMembers.map((member,idx) => 
                    <TeamPerson 
                        key={idx} 
                        portrait={member.headshot} 
                        category={member.positionCategory} 
                        name={member.fullName} 
                        title={member.positionTitle} 
                        bio={member.bio}
                        identifier={`member-${idx}`}
                        allTeamMembers={allTeamMembers}
                        closePerson={closePerson}
                    />)}
            </main>
            <Footer primaryColor={COLORS.primaryBlue} />
        </>
    )
}

export async function getStaticProps() {
    const aboutData = await client.fetch(`*[_type == 'aboutPage']`)
    const teamData = await client.fetch(`*[_type == 'aboutPage']{teamMembers[]->}`)
    return {
      props: {
        aboutData,
        teamData,
      },
      revalidate: 60, // In seconds
    }
  }

export default About;