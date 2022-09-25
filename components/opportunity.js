import { useState } from 'react';
import styled from "styled-components";
import { COLORS } from '../styles/colors';

const OpportunityStyles = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;
    padding: 25px 25px 25px 0;

    h3 {
        margin: 0;
        font-size: 2.6em;
    }

    h4 {
        margin: 1em 0 0;
        font-size: 2.2em;
    }

    p {
        margin: 0 !important;
    }

    .expand-button {
        position: relative;
        display: block;
        margin: 25px 0 0;
        width: 120px;
        font-size: 1.6em;
        padding: 9px 12px;
        border: 1px solid;
        text-align: center;
        cursor: pointer;
    }

    @media screen and (max-width: 900px) {
        padding: 25px 25px 25px 25px;
    }
`;

const OpportunityCard = styled.div`
    margin: 0;
`;

const HideWrapper = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: 0;
    overflow: hidden;
    transition-duration: 1s;
`;

const OpportunityDetails = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;
    padding: 0;

    li {
        margin: 0;
        font-size: 1.6em;
    }

    .detailp {
        margin: 1.3em 0 .3em !important;
    }

    .application-link {
        display: inline-block;
        margin: 0 6px;
        font-size: 1em;
        text-transform: none;
        padding: 0;
        background-color: none;
        border: none;
    }

    .disclaimer {
        display: block;
        margin: 0;
        font-size: 1.4em;
    }
`;

export default function Opportunity({jobTitle, jobDescription, jobBenefits, jobRequirements, jobApply, index}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandButton = (e) => {
        setIsExpanded(!isExpanded);
        const targetHeight = document.querySelector(`.jobdetails-${index}`).offsetHeight;
        const targetElement = e.target.previousElementSibling;
        console.log(targetElement);
        if (!isExpanded) {
            targetElement.style.height = targetHeight + 25 + 'px';
        } else {
            targetElement.style.height = 0;
        }
    }

    const colorIndex = (index) => {
        if (index === 0) {
            return `${COLORS.tutorPrimary}`;
        } else if (index === 1) {
            return `${COLORS.shepherdPrimary}`;
        } else {
            return `${COLORS.primaryBlue}`;
        }  
    }
    
    return (
        <OpportunityStyles>
            <OpportunityCard>
                <h3 style={{color: colorIndex(index)}}>{jobTitle}</h3>
                {jobDescription.map((description,idx) => {
                    return (
                        <p key={idx}>{description.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                    )
                })}

                <HideWrapper>
                    <OpportunityDetails className={`jobdetails-${index}`}>
                        <h4 style={{color: colorIndex(index)}}>Benefits:</h4>
                        {jobBenefits.map((benefit,idx) => {
                            if (benefit.hasOwnProperty('listItem')) {
                                return (
                                    <li key={idx}>{benefit.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</li>
                                )
                            } else {
                                return (
                                    <p className='detailp' key={idx}>{benefit.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                                )
                            } 
                        })}
                        <h4 style={{color: colorIndex(index)}}>Requirements:</h4>
                        {jobRequirements.map((requirement,idx) => {
                            if (requirement.hasOwnProperty('listItem')) {
                                return (
                                    <li key={idx}>{requirement.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</li>
                                )
                            } else {
                                return (
                                    <p className='detailp' key={idx}>{requirement.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                                )
                            } 
                        })}
                        <h4 style={{color: colorIndex(index)}}>How To Apply:</h4>
                        <p>Link to application: <a style={{color: colorIndex(index)}} className='application-link' target="_blank" rel="noreferrer" href={jobApply}>Apply Here</a></p>
                        <span className='disclaimer'>You will be asked to provide a copy of your official transcripts.</span>
                    </OpportunityDetails>
                </HideWrapper>

                <span style={{borderColor: colorIndex(index)}} className='expand-button' onClick={handleExpandButton}>{!isExpanded ? 'Learn More' : 'Learn Less'}</span>
            </OpportunityCard>
        </OpportunityStyles>
    )
}