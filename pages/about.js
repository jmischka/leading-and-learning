import client from "../client";
import Footer from "../components/footer";
import Testimonial from "../components/testimonial";
import { COLORS } from "../styles/colors";
import styled from 'styled-components';
import HeroImage from "../components/heroImage";

const IntroStyles = styled.div`
    position: relative;
    margin: 100px auto 0;
    width: 100%;
    max-width: 1450px;

    h2 {
        margin: 0 0 0 0;
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

    @media screen and (max-width: 1000px) {
        h2 {
            margin: 0 0 0 0;
        }
    }

    @media screen and (max-width: 800px) {
        margin: 50px auto 0;

        h2 {
            font-size: 3em;
        }
    }
`;

const PurposeStyles = styled.div`
    position: relative;
    margin: 100px auto 0;
    width: 100%;
    max-width: 1450px;
    height: auto;

    h2 {
        margin: 0 0 0 0;
        font-size: 4.3em;
        padding: 0 25px;
        color: ${COLORS.primaryBlue};
    }

    ul {
        margin: 0 0 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;

        li {
            margin: 0;
            margin: 0 0 1.2em 0;
            font-size: 1.8em;
            line-height: 1.5;
            width: calc(50% - 19px);
            height: auto;
            padding: 0 25px;

            &:before {
                content: "";
                display: block;
                margin: 25px 0;
                width: 25px;
                height: 4px;
                background: ${COLORS.primaryBlue};
            }
        }

        @media screen and (max-width: 1000px) {
            li {
                width: 100%;
            }
        }
    }

    @media screen and (max-width: 800px) {
        margin: 50px auto 0;

        h2 {
            font-size: 3em;
        }
    }
`;

const TeamStyles = styled.div`
    position: relative;
    margin: 100px auto 0;
    width: 100%;
    max-width: 1450px;

    h2 {
        margin: 0 0 0 0;
        font-size: 4.3em;
        color: ${COLORS.primaryBlue};
    }

    p {
        margin: 0 0 12px 0;
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
        margin: 50px auto 0;

        h2 {
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

function About({aboutData}) {
    const pageTitle = aboutData[0].pageTitle
    const mainImage = aboutData[0].mainImage.asset;
    const introTitle = aboutData[0].intro;
    const introText = aboutData[0].introCopy;
    const purposeTitle = aboutData[0].purposeTitle;
    const purposeText = aboutData[0].purposeCopy;
    const testimonialData = aboutData[0].testimonial;
    // const testimonialBlock = aboutData[0].testimonial[0].testimonial[0].children[0].text;
    // const testimonialByline = aboutData[0].testimonial[0].byline;
    // const testimonialSchool = aboutData[0].testimonial[0].schoolChoice;
    const teamTitle = aboutData[0].teamIntroTitle;
    const teamCopy = aboutData[0].teamIntroCopy

    return (
        <>
            <main>
                <HeroImage image={mainImage} />
                <IntroStyles>
                    <FlexWrapper>
                        <div><h2>{introTitle}</h2></div>
                        <div className="copy-blocks">
                            {introText.map((copy,idx) => {
                                return (
                                    <p key={idx}>{copy.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                                )
                            })}
                        </div>
                    </FlexWrapper>
                </IntroStyles>
                <PurposeStyles>
                    <h2>{purposeTitle}</h2>
                    <ul>
                        {purposeText.map((text,idx) => {
                            return (
                                <li key={idx}>{text.blockText[0].children[0].text}</li>
                            )
                        })}
                    </ul>
                </PurposeStyles>
                <Testimonial serviceTitle={pageTitle} testimonialData={testimonialData} />
                <TeamStyles>
                    <FlexWrapper>
                        <div>
                            <h2>{teamTitle}</h2>
                        </div>
                        <div className="copy-blocks">
                            {teamCopy.map((copy,idx) => {
                                return (
                                    <p key={idx}>{copy.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                                )
                            })}
                        </div>
                    </FlexWrapper>
                </TeamStyles>
            </main>
            <Footer primaryColor={COLORS.primaryBlue} />
        </>
    )
}

export async function getStaticProps() {
    const aboutData = await client.fetch(`*[_type == 'aboutPage']`)
    return {
      props: {
        aboutData,
      },
    }
  }

export default About;