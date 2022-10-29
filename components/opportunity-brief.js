import styled from 'styled-components';
import { COLORS } from '../styles/colors';

const Opportunity = styled.li`
    position: relative;
    margin: 0;
    width: 50%;
    height: auto;
    padding: 50px 25px 25px;

    .jobColorDash {
        position: absolute;
        display: block;
        top: 25px;
        left: 25px;
        width: 25px;
        height: 3px;
    }

    h3 {
        margin: 0 0 25px;
        font-size: 3.2em;
        line-height: 1.3;
    }

    @media screen and (max-width: 900px) {
        width: 100%;
    }
`;

const Button = styled.button`
    margin: 16px 0 0;
    font-family: 'AvenirNextLTW02', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    padding: 9px 12px;
    background-color: transparent;
    color: #333333;
    border: ${props => props.category === 'shepherding' 
        ? `1px solid ${COLORS.shepherdPrimary}` 
        : props.category === 'tutoring'
        ? `1px solid ${COLORS.tutorPrimary}`
        : props.category === 'testprep'
        ? `1px solid ${COLORS.testPrimary}`
        : props.category === 'educationalconsulting'
        ? `1px solid ${COLORS.educationPrimary}`
        : `1px solid ${COLORS.primaryBlue}`};
    cursor: pointer;
    transition-duration: .3s;
    &:hover {
        background-color: ${props => props.category === 'shepherding' 
            ? `${COLORS.shepherdPrimary}`
            :  props.category === 'tutoring'
            ? `${COLORS.tutorPrimary}`
            :  props.category === 'testprep'
            ? `${COLORS.testPrimary}`
            :  props.category === 'educationalconsulting'
            ? `${COLORS.educationPrimary}`
            : `${COLORS.primaryBlue}`};
        border: ${props => props.category === 'shepherding' 
            ? `1px solid ${COLORS.shepherdPrimary}` 
            : props.category === 'tutoring'
            ? `1px solid ${COLORS.tutorPrimary}`
            : props.category === 'testprep'
            ? `1px solid ${COLORS.testPrimary}`
            : props.category === 'educationalconsulting'
            ? `1px solid ${COLORS.educationPrimary}`
            : `1px solid ${COLORS.primaryBlue}`};
        color: white;
    }
`;

const careerColor = (category) => {
    if (category === 'tutoring') {
        return `${COLORS.tutorPrimary}`;;
    }
    if (category === 'shepherding') {
        return `${COLORS.shepherdPrimary}`;
    }
    if (category === 'testprep') {
        return `${COLORS.testPrimary}`;
    }
    if (category === 'educationalconsulting') {
        return `${COLORS.educationPrimary}`;
    }
    return `${COLORS.primaryBlue}`;
}

function OpportunityBrief({category, title, description, dataTag, handleOpportunityClick}) {
    return (
        <Opportunity>
            <span className='jobColorDash' style={{backgroundColor: careerColor(category)}} />
            <h3 style={{color: careerColor(category)}}>{title}</h3>
            <p>{description[0].children[0].text}</p>
            <Button 
                category={category}
                data-opportunity={dataTag} 
                onClick={handleOpportunityClick}>
                    Learn More
            </Button>
        </Opportunity>
    )
}

export default OpportunityBrief;