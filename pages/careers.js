import { useEffect, useRef, useState } from 'react';
import client from "../client";
import HeroImage from "../components/heroImage";
import { COLORS } from "../styles/colors";
import styled from 'styled-components';
import AlternateFooter from "../components/alternateFooter";
import OpportunityBrief from '../components/opportunity-brief';
import Opportunity from '../components/opportunity';
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
    width: 100%;
    height: auto;
    padding: 0 25px;

    @media screen and (max-width: 900px) {
        padding: 0 25px 25px 25px;
    }
`;

const JobBriefsList = styled.ul`
    margin: 50px 0 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    padding: 0;
    list-style-type: none;
`;

function Careers({careersData}) {
    const mainImage = careersData[0].mainImage.asset;
    const copyBlocks = careersData[0].introCopy;
    const jobs = careersData[0].jobOpportunity;

    const [isMobile, setIsMobile] = useState(true);
    const [allJobs, setAllJobs] = useState(null);
    const defaultJobsSet = useRef(null);
    
    useEffect(() => {
        let windowWidth = window.innerWidth;
        if (windowWidth > 800) {
            setIsMobile(false);
        }
    }, []);

    useEffect(() => {
        const jobsArray = jobs.map((job,idx) => {
            return {
                [`job-${idx}`]: false
            }
        })
        const obj = Object.assign(...jobsArray);
        setAllJobs(obj);
        defaultJobsSet.current = obj;
    }, [jobs])

    const handleOpportunityClick = (e) => {
        let targetJobObject = {[e.target.dataset.opportunity]: true}
        let newObj = Object.assign({}, defaultJobsSet.current, targetJobObject);
        setAllJobs(newObj);
    }

    const handleCloseOpportunityClick = () => {
        setAllJobs(defaultJobsSet.current);
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
                        {copyBlocks.map((copy,idx) => {
                            return (
                                <p key={idx}>{copy.children.map((child,idx) => 
                                    <span key={idx} className={child.marks.length 
                                        ? child.marks.map(mark => mark).join(' ') 
                                        : null}>{child.text}</span>)}
                                </p>
                            )
                        })}
                    </CareerHeader>
                   <JobBriefsList>
                        {jobs.map((job,idx) => 
                            <OpportunityBrief 
                                key={idx} 
                                category={job.jobCategory} 
                                title={job.jobTitle} 
                                description={job.jobDescription} 
                                dataTag={`job-${idx}`}
                                handleOpportunityClick={handleOpportunityClick}
                            />)}
                   </JobBriefsList>
                </PageStyles>
                {jobs.map((job,idx) => 
                    <Opportunity 
                        key={idx} 
                        category={job.jobCategory} 
                        title={job.jobTitle}
                        description={job.jobDescription} 
                        benefits={job.jobBenefits}
                        requirements={job.jobRequirements}
                        applyLink={job.jobApply}
                        transcriptNote={job.jobTranscript}
                        jobIndex={`job-${idx}`}
                        allJobsState={allJobs}
                        handleCloseOpportunityClick={handleCloseOpportunityClick}
                    />)}
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