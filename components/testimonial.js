import { useEffect, useState, useRef, useCallback } from 'react';
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

const TestimonialWindow = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;
`;

const TestimonialSlideTray = styled.div`
    position: relative;
    margin: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
    transition-duration: 1s;
    transition-timing-function: cubic-bezier(0.55, 0.01, 0.33, 1.18);
`;

const TestimonialContent = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;
`;

const TestimonialContentWrapper = styled.div`
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
        text-align: center;
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

export default function Testimonial({serviceTitle, testimonialData}) {
    const [slideShow, setSlideShow] = useState(false)
    const slideShowLength = useRef(testimonialData.length);
    const slideCount = useRef(0)

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

    const slideRotater = useCallback(() => {
        const slideTray = document.querySelector('.slidetray');
        const slides = Array.from(document.querySelectorAll('.slide'));
        console.log(slides[slideCount.current].offsetLeft); 
        if (slideCount.current < slideShowLength.current - 1) {
            slideCount.current = slideCount.current + 1;
            slideTray.style.left = -slides[slideCount.current].offsetLeft + 'px';
            console.log(slides[slideCount.current].offsetLeft);
        } else {
            slideCount.current = 0;
            slideTray.style.left = slides[slideCount.current].offsetLeft + 'px';
            console.log(slides[slideCount.current].offsetLeft);
        }
    }, [slideCount]);

    useEffect(() => {
        const slideTray = document.querySelector('.slidetray');
        slideTray.style.width = 100 * testimonialData.length + '%';
    }, []);

    useEffect(() => {
        if (testimonialData.length > 1) {
            setSlideShow(true);
        }
    }, []);

    useEffect(() => {
        if (slideShow) {
            const interval = setInterval(slideRotater, 4000);
            return () => clearInterval(interval);
        }
    }, [slideShow]);

    return (
        <TestimonialWrapper>
            <TestimonialBackground style={{backgroundColor: colorFinder(serviceTitle)}} />
            <TestimonialWindow>
                <TestimonialSlideTray className="slidetray">
                    {testimonialData.map((data,idx) => {
                        return (
                            <TestimonialContent key={idx} className="slide">
                                <TestimonialContentWrapper>
                                    {quoteFinder(serviceTitle.toLowerCase().replace(/ /g, ""))}
                                    <TestimonialText style={{color: colorFinder(serviceTitle)}}>{data.testimonial[0].children[0].text}</TestimonialText>
                                    <TestimonialAttr>{data.byline}</TestimonialAttr>
                                    <TestimonialAttr>{data.schoolChoice}</TestimonialAttr>
                                    <TestimonialDesc>Testimonial</TestimonialDesc>
                                </TestimonialContentWrapper>
                            </TestimonialContent>
                        )
                    })}
                </TestimonialSlideTray>
            </TestimonialWindow>
        </TestimonialWrapper>
    )
}