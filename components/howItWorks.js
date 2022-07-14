import { useEffect, useState } from 'react';
import styled from "styled-components";
import { COLORS } from '../styles/colors';

const HowItWorksStyles = styled.div`
    position: relative;
    margin: 100px auto 0;
    width: 100%;
    max-width: 1450px;
    height: auto;

    h2 {
      margin: 0 0 -25px;
      font-size: 4.3em;
      padding: 0 25px;
    }

    ul {
        position: relative;
        margin: 0;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        height: auto;
        list-style-type: none;
        padding: 0;

        li {
            margin: 0;
            width: 50%;
            padding: 18px 25px;
            display: flex;
            flex-direction: row;

            div.number {
                margin: 0;
                font-family: 'Libre Caslon Display', serif;
                font-size: 8em;
                width: 56px;
                letter-spacing: -3px;
            }

            div.double-number {
                margin: 0;
                font-family: 'Libre Caslon Display', serif;
                font-size: 8em;
                width: 95px;
                letter-spacing: -3px;
            }

            div.text {
                margin: 0;
                width: calc(100% - 50px);
                padding: 30px 0 0;
            }

            h3 {
                display: block;
                margin: 0 0 6px;
                font-size: 2.4em;
                line-height: 1;
            }

            @media screen and (max-width: 780px) {
                width: 100%;
            }
        }
    }
`;

export default function HowItWorks({serviceTitle, howTitle, howCopy}) {
    const [isMobile, setIsMobile] = useState(true);

    const getHeight = () => {
        if (!isMobile) {
            let title = serviceTitle.toLowerCase().replace(/ /g, "");
            let heightNumbersArray = [];
            let serviceHowList = document.querySelector(`#${title} ul`);
            let serviceListItems = Array.from(serviceHowList.children);
            let listNumberOperator = Math.ceil(serviceHowList.children.length / 2);
            for (let i = 0; i < listNumberOperator; i++) {
                heightNumbersArray.push(serviceListItems[i].offsetHeight);
            }
            let heightCalculation = heightNumbersArray.reduce((a,b) => a + b, 0);
            serviceHowList.style.height = heightCalculation + 'px';
        }
    }

    useEffect(() => {
        let windowWidth = window.innerWidth;
        if (windowWidth > 800) {
            setIsMobile(false);
        }
    }, []);

    useEffect(() => {
        setTimeout(getHeight, 500);
    }, [serviceTitle, isMobile]); 

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
        <HowItWorksStyles id={serviceTitle.toLowerCase().replace(/ /g, "")}>
            <h2 style={{color: colorFinder(serviceTitle)}}>{howTitle}</h2>
            <ul>
                {howCopy.map((copy, idx) => {
                    return (
                        <li key={idx}>
                            <div className={idx < 9 ? 'number' : 'double-number'} style={{color: colorFinder(serviceTitle)}}>{idx + 1}</div>
                            <div className="text">
                                <h3 style={{color: colorFinder(serviceTitle)}}>{copy.blockTitle}</h3>
                                <p>{copy.blockText[0].children[0].text}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </HowItWorksStyles>
    )
}