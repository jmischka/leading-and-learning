import client from "../client";
import Footer from "../components/footer";
import styled from "styled-components";
import { COLORS } from "../styles/colors";
import Testimonial from "../components/testimonial";
import HowItWorks from "../components/howItWorks";
import HeroImage from "../components/heroImage";
import SecondImage from "../components/secondImage";
import ServiceSectionContent from "../components/serviceSectionContent";

const OverviewStyles = styled.div`
    position: relative;
    margin: 50px auto 0;
    width: 100%;
    max-width: 1450px;
    height: auto;

    h2 {
        margin: 0 0 25px 0;
        font-size: 4.3em;
        color: ${COLORS.testPrimary};
    }

    p {
        margin: 0 0 1.2em 0;
        font-size: 1.8em;
        &:last-child {
            margin: 0 0 0 0;
        }
    }

    @media screen and (max-width: 780px) {
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

    @media screen and (max-width: 800px) {
      div {
        width: 100%;
      }

      div.copy-blocks {
            padding: 25px 25px 25px;
        }
    }    
`;

const OverviewTable = styled.div`
    position: relative;
    margin: 0;
    width: 100% !important;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 !important;

    div {
        display: block;
        margin: 0;
        width: 50%;
        height: auto;
        padding: 0;
        
        &:nth-child(odd) {
            padding: 0 12px 0 0;
        }
        &:nth-child(even) {
            padding: 0 0 0 12px;
        }

        @media screen and (max-width: 800px) {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;

            &:nth-child(odd) {
                padding: 0 0 0 0;
            }
            &:nth-child(even) {
                padding: 0 0 0 0;
            }
        }
    }

    h3 {
        margin: 16px 0 0;
        font-size: 1.8em; 
        color: ${COLORS.testPrimary};
    }

    ul {
        position: relative;
        display: block;
        margin: 0;
        padding-left: 0;
        list-style-type: none;
    }

    li {
        margin: 0;
        padding: 0;
        font-size: 1.6em;
    }

    @media screen and (max-width: 800px) {
        h3 {
            margin: 0 0 0;
            width: 45%;
        }

        ul {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 0 0 16px;
            width: 45%;
        }
    }
`;

function Testprep({testprepData, testprepBrochure}) {
    const serviceTitle = testprepData[0].servicesTitle;
    const mainImage = testprepData[0].mainImage.asset;
    const overviewTitle = testprepData[0].serviceOverviewTitle;
    const overviewText = testprepData[0].serviceOverview;
    const whyTitle = testprepData[0].serviceWhyTitle;
    const whyText = testprepData[0].whyCopy;
    const testimonialBlock = testprepData[0].serviceTestimonial[0].testimonial[0].children[0].text;
    const testimonialByline = testprepData[0].serviceTestimonial[0].byline;
    const testimonialSchool = testprepData[0].serviceTestimonial[0].schoolChoice;
    const howTitle = testprepData[0].serviceHowTitle;
    const howCopy = testprepData[0].howItWorksCopy;
    const secondImage = testprepData[0].secondImage.asset;
    const buttonText = testprepData[0].servicesButtonText;
    const brochure = testprepBrochure[0].manuscriptURL;

    return (
        <>
            <main>
                <HeroImage image={mainImage} />
                <OverviewStyles>
                    <FlexWrapper>
                        <div><h2>{overviewTitle}</h2></div>
                        <div className="copy-blocks">
                            <p>{overviewText[0].children[0].text}</p>
                            <OverviewTable>
                                {overviewText.map((block,idx) => {
                                    return idx !== 0 
                                    ? <div key={idx}>
                                        <h3>{block.blockTitle}</h3>
                                        <ul>{block.blockText.map((text,idx) => <li key={idx}>{text.children[0].text}</li>)}</ul>
                                    </div> 
                                    : null
                                })}
                            </OverviewTable>
                        </div>
                    </FlexWrapper>
                </OverviewStyles>
                <ServiceSectionContent serviceTitle={serviceTitle} sectionTitle={whyTitle} sectionText={whyText} />
                <Testimonial serviceTitle={serviceTitle} testimonialBlock={testimonialBlock} testimonialByline={testimonialByline} schoolChoice={testimonialSchool} />
                <HowItWorks serviceTitle={serviceTitle} howTitle={howTitle} howCopy={howCopy} />
                <SecondImage image={secondImage} buttonText={buttonText} serviceTitle={serviceTitle} brochure={brochure} />
            </main>
            <Footer primaryColor={COLORS.testPrimary} />
        </>
    )
}

export async function getStaticProps() {
    const testprepData = await client.fetch(`*[_type == 'servicePages' && servicesTitle == 'Test Prep']`)
    const testprepBrochure = await client.fetch(`*[_type == 'servicePages' && servicesTitle == 'Test Prep']{"manuscriptURL": brochureUpload.asset->url}`)
    return {
      props: {
        testprepData,
        testprepBrochure,
      },
    }
}

export default Testprep;