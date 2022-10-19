import { useEffect, useState } from 'react';
import client from "../client";
import HeroImage from "../components/heroImage";
import { COLORS } from "../styles/colors";
import styled from 'styled-components';
import AlternateFooter from "../components/alternateFooter";
// import Opportunity from '../components/opportunity';

const PageStyles = styled.div`
    position: relative;
    margin: 100px auto 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 1450px;
    padding: 0 0 75px;

    h2 {
        margin: 0 0 25px;
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

    .email-link {
        display: block;
        margin: 50px 0;
        width: 125px;
        font-size: 1.4em;
        text-decoration: none;
        color: #FFFFFF;
        padding: 12px;
        border: 1px solid ${COLORS.primaryBlue};
        background: ${COLORS.primaryBlue};
        text-transform: uppercase;
        text-align: center;
        transition-duration: .3s;
        cursor: pointer;
        &:hover {
            background: transparent;
            color: ${COLORS.primaryBlue}
        }
    }

    @media screen and (max-width: 800px) {
        margin: 50px auto 0;
        h2 {
            margin: 0 0 0 0;
            font-size: 4.2em;
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

const CareerHeader = styled.div`
    position: relative;
    margin: 0;
    width: 75%;
    height: auto;
    padding: 0 25px;

    @media screen and (max-width: 900px) {
        width: 100%;
        padding: 0 25px 25px 25px;
    }
`;

const JobBriefsList = styled.ul`
    margin: 25px 0 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    padding: 0;
    list-style-type: none;

    li {
        position: relative;
        margin: 0;
        width: 50%;
        height: auto;
        padding: 50px 25px 25px;

        .jobColorDash {
            position: absolute;
            top: 25px;
            left: 25px;
            width: 25px;
            height: 3px;
        }
    }

    h3 {
        margin: 0 0 25px;
        font-size: 3.2em;
        line-height: 1.3;
    }

    button {
        margin: 16px 0 0;
        padding: 9px 12px;
        border: 1px solid black;
        background-color: transparent;
        cursor: pointer;
        transition-duration: .5s;
        &:hover {
            background-color: ${COLORS.primaryBlue};
            color: white;
            border: none;
        }
    }
`;

function Careers({careersData}) {
    const title = careersData[0].introTitle;
    const mainImage = careersData[0].mainImage.asset;
    const copyBlocks = careersData[0].introCopy;
    const buttonText = careersData[0].emailButtonText;
    const jobs = careersData[0].jobOpportunity;

    const [isMobile, setIsMobile] = useState(true);
    
    useEffect(() => {
        let windowWidth = window.innerWidth;
        if (windowWidth > 800) {
            setIsMobile(false);
        }
    }, []);

    const careerColor = (category) => {
        if (category === 'tutoring') {
            return `${COLORS.tutorPrimary}`;;
        }
        if (category === 'shepherding') {
            return `${COLORS.shepherdPrimary}`;
        }
    }

    return (
        <>
            <main>
                {isMobile ? (
                    <HeroImage image={mainImage} />
                ) : (
                    <VideoWrapper>
                        <video src="/careerVideo.mp4" autoPlay loop muted />
                    </VideoWrapper>
                )}
                <PageStyles>
                    <CareerHeader>
                        <h2>{title}</h2>
                        {copyBlocks.map((copy,idx) => {
                            return (
                                <p key={idx}>{copy.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                            )
                        })}
                        {/* <a className='email-link' href="mailto: info@leadingandlearning.com">{buttonText}</a> */}
                    </CareerHeader>
                   <JobBriefsList>
                        {jobs.map((job,idx) => {
                            return (
                                <li key={idx}>
                                    <span className='jobColorDash' style={{backgroundColor: careerColor(job.jobCategory)}} />
                                    <h3 style={{color: careerColor(job.jobCategory)}}>{job.jobTitle}</h3>
                                    <p>{job.jobDescription[0].children[0].text}</p>
                                    <button style={{borderColor: careerColor(job.jobCategory)}}>Learn More</button>
                                </li>
                            );
                        })}
                   </JobBriefsList>
                </PageStyles>
            </main>
            <AlternateFooter />
        </>
    )
}

export async function getStaticProps() {
    const careersData = await client.fetch(`*[_type == 'careersPage']`)
    return {
      props: {
        careersData,
      },
      revalidate: 60, // In seconds
    }
  }

export default Careers;