import { useEffect, useState } from 'react';
import client from "../client";
import styled from "styled-components";
import Footer from "../components/footer";
import { COLORS } from "../styles/colors";
import Testimonial from "../components/testimonial";
import HowItWorks from "../components/howItWorks";
import HeroImage from "../components/heroImage";
import SecondImage from "../components/secondImage";
import ServiceSectionContent from "../components/serviceSectionContent";

const VideoWrapper = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;

    video {
        position: relative;
        margin: 0;
        width: 100%;
        height: auto;
    }
`;

function Consulting({consultingData, consultingBrochure}) {
    const serviceTitle = consultingData[0].servicesTitle;
    const mainImage = consultingData[0].mainImage.asset;
    const overviewTitle = consultingData[0].serviceOverviewTitle;
    const overviewText = consultingData[0].serviceOverview;
    const offeringTitle = consultingData[0].serviceOfferingTitle;
    const offeringCopy = consultingData[0].offeringCopy;
    const whyTitle = consultingData[0].serviceWhyTitle;
    const whytext = consultingData[0].whyCopy;
    const testimonialData = consultingData[0].serviceTestimonial;
    const howTitle = consultingData[0].serviceHowTitle;
    const howCopy = consultingData[0].howItWorksCopy;
    const secondImage = consultingData[0].secondImage.asset;
    const buttonText = consultingData[0].servicesButtonText;
    const brochure = consultingBrochure[0].manuscriptURL;

    const [isMobile, setIsMobile] = useState(true);
    
    useEffect(() => {
        let windowWidth = window.innerWidth;
        if (windowWidth > 800) {
            setIsMobile(false);
        }
    }, []);

    return (
        <>
            <main>
                {isMobile ? (
                    <HeroImage image={mainImage} />
                ) : (
                    <VideoWrapper>
                        <video src="/educationVideo.mp4" autoPlay loop muted />
                    </VideoWrapper>
                )}
                <ServiceSectionContent serviceTitle={serviceTitle} sectionTitle={overviewTitle} sectionText={overviewText} />
                <ServiceSectionContent serviceTitle={serviceTitle} sectionTitle={offeringTitle} sectionText={offeringCopy} />
                <ServiceSectionContent serviceTitle={serviceTitle} sectionTitle={whyTitle} sectionText={whytext} />
                <Testimonial serviceTitle={serviceTitle} testimonialData={testimonialData} />
                <HowItWorks serviceTitle={serviceTitle} howTitle={howTitle} howCopy={howCopy} />
                <SecondImage image={secondImage} buttonText={buttonText} serviceTitle={serviceTitle} brochure={brochure} />
            </main>
            <Footer primaryColor={COLORS.educationPrimary} />
        </>
    )
}

export async function getStaticProps() {
    const consultingData = await client.fetch(`*[_type == 'servicePages' && servicesTitle == 'Educational Consulting']`)
    const consultingBrochure = await client.fetch(`*[_type == 'servicePages' && servicesTitle == 'Educational Consulting']{"manuscriptURL": brochureUpload.asset->url}`)
    return {
      props: {
        consultingData,
        consultingBrochure,
      },
      revalidate: 60, // In seconds
    }
}

export default Consulting;