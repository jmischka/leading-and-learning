import styled from 'styled-components';
import { COLORS } from '../styles/colors';

const SectionStyles = styled.div`
    position: relative;
    margin: 50px auto 0;
    width: 100%;
    max-width: 1450px;
    height: auto;

    h2 {
        margin: 0 0 25px 0;
        font-size: 4.3em;
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

    @media screen and (max-width: 800px) {
        margin: 35px auto 0;

        h2 {
            margin: 0 0 0 0;
            font-size: 3em;
        }
    }
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

export default function ServiceSectionContent({serviceTitle, sectionTitle, sectionText}) {

    const colorFinder = (serviceTitle) => {
        let servicetext = serviceTitle ? serviceTitle.toLowerCase().replace(/ /g, "") : null;
        if (servicetext === 'tutoring') {
            return `${COLORS.tutorPrimary}`;
        } else if (servicetext === 'shepherding') {
            return `${COLORS.shepherdPrimary}`;
        } else if (servicetext === 'testprep') {
            return `${COLORS.testPrimary}`;
        } else if (servicetext === 'educationalconsulting') {
            return `${COLORS.educationPrimary}`;
        } else {
            return `${COLORS.primaryBlue}`;
        }  
    }

    return (
        <SectionStyles>
            <FlexWrapper>
                <div><h2 style={{color: colorFinder(serviceTitle)}}>{sectionTitle}</h2></div>
                <div className="copy-blocks">
                    {sectionText.map((copy,idx) => {
                        return (
                            <p key={idx}>{copy.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                        )
                    })}
                </div>
            </FlexWrapper>
        </SectionStyles>
    )
}