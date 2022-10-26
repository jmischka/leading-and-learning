import styled from "styled-components";
import { COLORS } from '../styles/colors';

const OpportunityStyles = styled.div`
    position: fixed;
    top: 100%;
    left: 0;
    width: 100%;
    height: calc(100vh - 115px);
    background-color: white;
    padding: 75px 25px 0;
    transition-duration: .5s;
    transition-timing-function: cubic-bezier(0.01, 0, 0.17, 1.01);
    z-index: 100;
    &.active-opportunity {
        top: 115px;
    }

    @media screen and (max-width: 780px) {
        height: calc(100vh - 90px);
        &.active-opportunity {
            top: 90px;
        }
    }
`;

const CloseButton = styled.div`
    position: absolute;
    left: 50%;
    top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    max-width: 1450px;
    padding: 0 25px;
    height: auto;
    transform: translateX(-50%);

    button {
        position: relative;
        margin: 0;
        width: 35px;
        height: 35px;
        border: none;
        background-color: transparent;
        transition-duration: .5s;
        opacity: .6;
        cursor: pointer;
        &:hover {
            opacity: 1;
        }

        span {
            position: absolute;
            width: 35px;
            height: 3px;
            left: 50%;
            top: 50%;
            background-color: ${COLORS.primaryBlue};
            &:nth-child(1) {
                transform: translate(-50%,-50%) rotate(-45deg);
            }
            &:nth-child(2) {
                transform: translate(-50%,-50%) rotate(45deg);
            }
        }
    }
`

const OpportunityWindow = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 75vh;
    overflow-x: hidden;
    overflow-y: scroll;
`
const OpportunityContainer = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1450px;
    height: auto;
    padding: 0 0 75px;
`

const SectionStyles = styled.div`
    margin: 0;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 25px 0;

    .section-title {
        margin: 0;
        width: 45%;
        height: auto;
        padding: 25px;
    }

    .content {
        margin: 0;
        width: 53.5%;
        height: auto;
        padding: 30px 25px 25px;
    }

    h3 {
        margin: 0 0 25px;
        font-size: 3.2em;
        line-height: 1.3;
    }

    ul {
        margin: 0;
        width: 100%;
        height: auto;
        list-style-type: none;
        padding: 0;

        li {
            margin: 0 0 9px;
            list-style-type: none;
            font-size: 1.8em;
            line-height: 1.5;
        }

        p {
            font-size: 2.2em;
            margin: 32px 0 6px;
        }
    }

    .apply-link {
        display: inline-block !important;
        margin: 0 6px !important;
        color: ${COLORS.primaryBlue};
        &:hover {
            text-decoration: none;
        }
    }

    .disclaimer {
        display: block;
        margin: 16px 0 0;
        font-size: 1.6em;
        line-height: 1.5;
    }

    @media screen and (max-width: 900px) {
        .section-title {
            margin: 0;
            width: 100%;
            height: auto;
            padding: 0 25px;
        }

        .content {
            margin: 0;
            width: 100%;
            height: auto;
            padding: 0 25px 25px;
        }
    }
`

const careerColor = (category) => {
    if (category === 'tutoring') {
        return `${COLORS.tutorPrimary}`;;
    }
    if (category === 'shepherding') {
        return `${COLORS.shepherdPrimary}`;
    }
}

export default function Opportunity({category,title,description,benefits,requirements,applyLink,jobIndex,allJobsState,handleCloseOpportunityClick}) {
    return (
        <OpportunityStyles className={!allJobsState ? null : allJobsState[jobIndex] ? 'active-opportunity' : null}>
            <CloseButton>
                <button onClick={handleCloseOpportunityClick}>
                    <span /><span />
                </button>
            </CloseButton>
            <OpportunityWindow>
                <OpportunityContainer>
                    <SectionStyles>
                        <div className='section-title'><h3 style={{color: careerColor(category)}}>{title}</h3></div>
                        <div className='content'><p>{description[0].children[0].text}</p></div>
                    </SectionStyles>
                    <SectionStyles>
                        <div className='section-title'><h3 style={{color: careerColor(category)}}>Benefits</h3></div>
                        <div className='content'>
                            <ul>
                                {benefits.map((benefit,idx) => 
                                    benefit.listItem 
                                    ? <li key={idx}>{benefit.children[0].text}</li> 
                                    : <p key={idx}>{benefit.children[0].text}</p>)}
                            </ul>
                        </div>
                    </SectionStyles>
                    <SectionStyles>
                        <div className='section-title'><h3 style={{color: careerColor(category)}}>Requirements</h3></div>
                        <div className='content'>
                            <ul>
                                {requirements.map((requirement,idx) => 
                                    requirement.listItem 
                                    ? <li key={idx}>{requirement.children[0].text}</li> 
                                    : <p key={idx}>{requirement.children[0].text}</p>)}
                            </ul>
                        </div>
                    </SectionStyles>
                    <SectionStyles>
                        <div className='section-title'><h3 style={{color: careerColor(category)}}>How To Apply</h3></div>
                        <div className='content'>
                            <p>Fill out this form to apply: 
                                <a target="_blank" rel="noreferrer" className='apply-link' href={applyLink}>Application Form</a>
                            </p>
                            <span className='disclaimer'>
                                ****Note: You will need to upload a copy of your unofficial transcripts in order for this application to be considered complete.
                            </span>
                        </div>
                    </SectionStyles>
                </OpportunityContainer>
            </OpportunityWindow>
        </OpportunityStyles>
    )
}