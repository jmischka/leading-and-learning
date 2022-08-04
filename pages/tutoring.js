import client from "../client";
import Footer from "../components/footer";
import { COLORS } from "../styles/colors";
import styled from "styled-components";
import Testimonial from "../components/testimonial";
import HowItWorks from "../components/howItWorks";
import HeroImage from "../components/heroImage";
import SecondImage from "../components/secondImage";
import ServiceSectionContent from "../components/serviceSectionContent";


const OfferingStyles = styled.div`
  position: relative;
  margin: 50px auto 0;
  width: 100%;
  max-width: 1450px;
  height: auto;

  h2 {
      margin: 0 0 25px 0;
      font-size: 4.3em;
      color: ${COLORS.tutorPrimary}
    }

  p {
    font-size: 1.8em;
  }

  @media screen and (max-width: 800px) {
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

    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }

  div.copy-blocks {
    padding: 35px 25px 25px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    div {
      display: block;
      margin: 0;
      width: 50%;

      &:nth-child(odd) {
        padding: 0 25px 0 0;
      }
      &:nth-child(even) {
        padding: 0 0 0 25px;
      }

      @media screen and (max-width: 800px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
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
      margin: 0;
      font-size: 1.8em;
      line-height: 1.3;
      color: ${COLORS.tutorPrimary}
    }

    span {
      display: block;
      margin: 0 0 25px;
      font-size: 1.8em;
      line-height: 1.3;
    }

    @media screen and (max-width: 800px) {
      width: 100%;
      padding: 12px 25px 25px;

      h3 {
        width: 100%;
      }

      span {
        width: 100%;
      }
    }
  }
`;


function Tutoring({tutoringData, tutoringBrochure}) {
    const serviceTitle = tutoringData[0].servicesTitle;
    const mainImage = tutoringData[0].mainImage.asset;
    const overviewTitle = tutoringData[0].serviceOverviewTitle;
    const overviewText = tutoringData[0].serviceOverview;
    const offeringTitle = tutoringData[0].serviceOfferingTitle;
    const offeringCopy = tutoringData[0].offeringCopy;
    const whyTitle = tutoringData[0].serviceWhyTitle;
    const whyText = tutoringData[0].whyCopy;
    const testimonialData = tutoringData[0].serviceTestimonial;
    const howTitle = tutoringData[0].serviceHowTitle;
    const howCopy = tutoringData[0].howItWorksCopy;
    const secondImage = tutoringData[0].secondImage.asset;
    const buttonText = tutoringData[0].servicesButtonText;
    const brochure = tutoringBrochure[0].manuscriptURL;

    return (
        <>
            <main>
              <HeroImage image={mainImage} />
              <ServiceSectionContent serviceTitle={serviceTitle} sectionTitle={overviewTitle} sectionText={overviewText} />
              <OfferingStyles>
                <FlexWrapper>
                  <div><h2>{offeringTitle}</h2></div>
                  <div className="copy-blocks">
                    {offeringCopy.map((copy,idx) => {
                      return idx !== 0
                      ? <div key={idx}>
                          <h3>{copy.blockTitle}</h3>
                          {idx !== 5 ? <span>{copy.blockText[0].children[0].text}</span> : null}
                        </div>
                      : null
                    })}
                  </div>
                </FlexWrapper>
              </OfferingStyles>
              <ServiceSectionContent serviceTitle={serviceTitle} sectionTitle={whyTitle} sectionText={whyText} />
              <Testimonial serviceTitle={serviceTitle} testimonialData={testimonialData} />
              <HowItWorks serviceTitle={serviceTitle} howTitle={howTitle} howCopy={howCopy} />
              <SecondImage image={secondImage} buttonText={buttonText} serviceTitle={serviceTitle} brochure={brochure} />
            </main>
            <Footer primaryColor={COLORS.tutorPrimary} />
        </>
    )
}

export async function getStaticProps() {
    const tutoringData = await client.fetch(`*[_type == 'servicePages' && servicesTitle == 'Tutoring']`)
    const tutoringBrochure = await client.fetch(`*[_type == 'servicePages' && servicesTitle == 'Tutoring']{"manuscriptURL": brochureUpload.asset->url}`)
    return {
      props: {
        tutoringData,
        tutoringBrochure,
      },
      revalidate: 60, // In seconds
    }
  }

export default Tutoring;