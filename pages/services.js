import client from "../client";
import Footer from "../components/footer";
import { COLORS } from "../styles/colors";
import styled from "styled-components";
import ServiceLink from "../components/serviceLink";

const ServicePageStyles = styled.div`
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1450px;
    height: auto;
    padding: 100px 0 75px;
`;

const Header = styled.div`
    position: relative;
    margin: 0;
    width: 100%;
    height: auto;

    h2 {
        margin: 0 0 25px 0;
        width: 850px;
        font-size: 4.5em;
        line-height: 1.3;
        padding: 0 25px;
        color: ${COLORS.primaryBlue}
    }

    p {
        font-size: 1.8em;
        line-height: 1.5;
        padding: 0 25px;
    }
`;

const ServiceList = styled.ul`
    position: relative;
    margin: 25px 0 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    padding: 0 12px;
    list-style-type: none;
`;

function Services({servicePageData}) {
    const servicesTitle = servicePageData[0].servicesOverviewTitle;
    const servicesText = servicePageData[0].servicesOverview;
    const serviceItems = servicePageData[0].servicesCopyBlock;
    return (
        <>
            <main>
                <ServicePageStyles>
                    <Header>
                        <h2>{servicesTitle}</h2>
                        {servicesText.map((copy,idx) => {
                            return (
                                <p key={idx}>{copy.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                            )
                        })}
                    </Header>
                    <ServiceList>
                        {serviceItems.map((item,idx) => <ServiceLink key={idx} title={item.serviceBlockTitle} image={item.blockImage.asset} textBlock={item.blockText} />)}
                    </ServiceList>
                </ServicePageStyles>
            </main>
            <Footer primaryColor={COLORS.primaryBlue} />
        </>
    )
}

export async function getStaticProps() {
    const servicePageData = await client.fetch(`*[_type == 'homePage']{servicesOverviewTitle,servicesOverview,servicesCopyBlock}`)
    return {
      props: {
        servicePageData,
      },
    }
  }

export default Services;