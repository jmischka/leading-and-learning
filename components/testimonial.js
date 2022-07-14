import Image from "next/image";
import styled from "styled-components";
import mainQuoteMark from "../assets/main-quotemark.png";
import educationQuoteMark from "../assets/educationalconsulting-quotemark.png";
import shepherdingQuoteMark from "../assets/shepherding-quotemark.png";
import testprepQuoteMark from "../assets/testprep-quotemark.png";
import tutoringQuoteMark from "../assets/tutoring-quotemark.png"
import { COLORS } from "../styles/colors";

const TestimonialWrapper = styled.div`
    position: relative;
    margin: 100px auto 0;
    width: 100%;
    padding: 125px 0 75px;

    @media screen and (max-width: 1200px) {
        padding: 75px 0 75px;
    }
`;

const TestimonialBackground = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    opacity: .15;
`;

const TestimonialContent = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1250px;
    padding: 0 25px;

    div.quotemark {
        position: absolute;
        left: -75px;
        top: -45px;
        margin: 0;
        width: 128px;
        height: 86px;
        overflow: hidden;
        opacity: .5;
    }

    span.desc {
        display: block;
        width: 100%;
    }

    @media screen and (max-width: 1200px) {
        div.quotemark {
            display: none;
        }
    }
`;

const TestimonialText = styled.span`
    position: relative;
    display: block;
    font-size: 4.6em;
    line-height: 1.3;
    font-style: normal;
    margin: 0 auto 35px;
    width: 100%;
    height: auto;

    @media screen and (max-width: 1200px) {
        font-size: 3.6em;
    }

    @media screen and (max-width: 800px) {
        font-size: 3em;
    }
`;

const TestimonialAttr = styled.span`
    position: relative;
    display: block;
    font-size: 1.4em;
    line-height: 1.3;
    margin: 0 auto;
    width: 100%;
    height: auto;
    text-align: center;
`;

const TestimonialDesc = styled.span`
    position: relative;
    display: block;
    font-size: 1.2em;
    line-height: 1.3;
    margin: 0;
    width: 100%;
    height: auto;
    text-align: center;
    font-style: italic; 
`;

export default function Testimonial({serviceTitle, testimonialBlock, testimonialByline, schoolChoice}) {
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

    const quoteFinder = (title) => {
        if (title === 'tutoring') {
            return (
                <div className="quotemark">
                    <Image src={tutoringQuoteMark} alt="Graphic" placeholder="blur" />
                </div>
            )
        } else if (title === 'testprep') {
            return (
                <div className="quotemark">
                    <Image src={testprepQuoteMark} alt="Graphic" placeholder="blur" />
                </div>
            )
        } else if (title === 'shepherding') {
            return (
                <div className="quotemark">
                    <Image src={shepherdingQuoteMark} alt="Graphic" placeholder="blur" />
                </div>
            )
        } else if (title === 'educationalconsulting') {
            return (
                <div className="quotemark">
                    <Image src={educationQuoteMark} alt="Graphic" placeholder="blur" />
                </div>
            ) 
        } else {
            return (
                <div className="quotemark">
                    <Image src={mainQuoteMark} alt="Graphic" placeholder="blur" />
                </div>
            )
        }
    }

    return (
        <TestimonialWrapper>
            <TestimonialBackground style={{backgroundColor: colorFinder(serviceTitle)}} />
            <TestimonialContent>
                {quoteFinder(serviceTitle.toLowerCase().replace(/ /g, ""))}
                <TestimonialText style={{color: colorFinder(serviceTitle)}}>{testimonialBlock}</TestimonialText>
                <TestimonialAttr>{testimonialByline}</TestimonialAttr>
                <TestimonialAttr>{schoolChoice}</TestimonialAttr>
                <TestimonialDesc>Testimonial</TestimonialDesc>
            </TestimonialContent>
        </TestimonialWrapper>
    )
}