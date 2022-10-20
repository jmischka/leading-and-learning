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

    button {
        margin: 16px 0 0;
        padding: 9px 12px;
        border: 1px solid;
        background-color: transparent;
        cursor: pointer;
        transition-duration: .5s;
        &:hover {
            background-color: ${COLORS.primaryBlue};
            border: none;
            color: white;
        }
    }
`;

const careerColor = (category) => {
    if (category === 'tutoring') {
        return `${COLORS.tutorPrimary}`;;
    }
    if (category === 'shepherding') {
        return `${COLORS.shepherdPrimary}`;
    }
}

function OpportunityBrief({category, title, description, dataTag, handleOpportunityClick}) {
    return (
        <Opportunity>
            <span className='jobColorDash' style={{backgroundColor: careerColor(category)}} />
            <h3 style={{color: careerColor(category)}}>{title}</h3>
            <p>{description[0].children[0].text}</p>
            <button 
                data-opportunity={dataTag} 
                style={{borderColor: careerColor(category)}} 
                onClick={handleOpportunityClick}>
                    Learn More
            </button>
        </Opportunity>
    )
}

export default OpportunityBrief;