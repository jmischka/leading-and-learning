import client from "../client";
import Footer from "../components/footer";
import { COLORS } from "../styles/colors";
import Testimonial from "../components/testimonial";
import HowItWorks from "../components/howItWorks";
import HeroImage from "../components/heroImage";
import SecondImage from "../components/secondImage";
import ServiceSectionContent from "../components/serviceSectionContent";


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
    const testimonialBlock = consultingData[0].serviceTestimonial[0].testimonial[0].children[0].text;
    const testimonialByline = consultingData[0].serviceTestimonial[0].byline;
    const testimonialSchool = consultingData[0].serviceTestimonial[0].schoolChoice;
    const howTitle = consultingData[0].serviceHowTitle;
    const howCopy = consultingData[0].howItWorksCopy;
    const secondImage = consultingData[0].secondImage.asset;
    const buttonText = consultingData[0].servicesButtonText;
    const brochure = consultingBrochure[0].manuscriptURL;

    return (
        <>
            <main>
                <HeroImage image={mainImage} />
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
    }
}

export default Consulting;