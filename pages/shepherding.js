import client from "../client";
import Footer from "../components/footer";
import { COLORS } from "../styles/colors";
import Testimonial from "../components/testimonial";
import HowItWorks from "../components/howItWorks";
import HeroImage from "../components/heroImage";
import SecondImage from "../components/secondImage";
import ServiceSectionContent from "../components/serviceSectionContent";


function Shepherding({shepherdingData, shepherdingBrochure}) {
    const serviceTitle = shepherdingData[0].servicesTitle;
    const mainImage = shepherdingData[0].mainImage.asset;
    const overviewTitle = shepherdingData[0].serviceOverviewTitle;
    const overviewText = shepherdingData[0].serviceOverview;
    const offeringTitle = shepherdingData[0].serviceOfferingTitle;
    const offeringText = shepherdingData[0].offeringCopy;
    const whyTitle = shepherdingData[0].serviceWhyTitle;
    const whyText = shepherdingData[0].whyCopy;
    const testimonialData = shepherdingData[0].serviceTestimonial;
    const howTitle = shepherdingData[0].serviceHowTitle;
    const howCopy = shepherdingData[0].howItWorksCopy;
    const secondImage = shepherdingData[0].secondImage.asset;
    const buttonText = shepherdingData[0].servicesButtonText;
    const brochure = shepherdingBrochure[0].manuscriptURL;

    return (
        <>
            <main>
              <HeroImage image={mainImage} />
              <ServiceSectionContent serviceTitle={serviceTitle} sectionTitle={overviewTitle} sectionText={overviewText} />
              <ServiceSectionContent serviceTitle={serviceTitle} sectionTitle={offeringTitle} sectionText={offeringText} />
              <ServiceSectionContent serviceTitle={serviceTitle} sectionTitle={whyTitle} sectionText={whyText} />
              <Testimonial serviceTitle={serviceTitle} testimonialData={testimonialData} />
              <HowItWorks serviceTitle={serviceTitle} howTitle={howTitle} howCopy={howCopy} />
              <SecondImage image={secondImage} buttonText={buttonText} serviceTitle={serviceTitle} brochure={brochure} />
            </main>
            <Footer primaryColor={COLORS.shepherdPrimary} />
        </>
    )
}

export async function getStaticProps() {
    const shepherdingData = await client.fetch(`*[_type == 'servicePages' && servicesTitle == 'Shepherding']`)
    const shepherdingBrochure = await client.fetch(`*[_type == 'servicePages' && servicesTitle == 'Shepherding']{"manuscriptURL": brochureUpload.asset->url}`)
    return {
      props: {
        shepherdingData,
        shepherdingBrochure,
      },
    }
  }

export default Shepherding;