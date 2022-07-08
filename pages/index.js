import client from "../client";
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import Footer from "../components/footer";
import { COLORS } from "../styles/colors";
import styled from "styled-components";
import HomeServiceLink from "../components/homeServiceLink";
import Testimonial from "../components/testimonial";
import Link from "next/link";

const MainImage = styled.div`
  position: relative;
  margin: 0 0 50px;
  width: 100%;
  height: calc(100vh - 115px);
  padding-bottom: 0;
  overflow: hidden;

  div {
    position: absolute;
    margin: 0;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%,-50%);
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
  }
`;

const HeaderContent = styled.div`
  position: relative;
  margin: 100px auto 0;
  width: 100%;
  max-width: 1450px;
  height: auto;
  padding: 0 25px;

  h2 {
    margin: 0 0 25px 0;
    width: 600px;
    font-size: 4.3em;
    line-height: 1.3;
    color: ${COLORS.primaryBlue}
  }

  p {
    font-size: 1.8em;
    line-height: 1.5;
  }

  a {
    display: block;
    margin: 35px 0 0;
    width: 120px;
    font-size: 1.4em;
    text-decoration: none;
    color: #FFFFFF;
    padding: 12px;
    border: 1px solid ${COLORS.primaryBlue};
    background: ${COLORS.primaryBlue};
    text-transform: uppercase;
    text-align: center;
    transition-duration: .3s;
    cursor: pointer;
    &:hover {
      background: transparent;
      color: ${COLORS.primaryBlue};
    }
  }

  @media screen and (max-width: 800px) {
    margin: 50px auto 0;

    h2 {
      font-size: 3em;
      width: 100%;
    }
  }
`;

const ServicesContent = styled.div`
  position: relative;
  margin: 100px auto 0;
  width: 100%;
  max-width: 1450px;
  height: auto;

  @media screen and (max-width: 800px) {
    margin: 75px auto 0;
  }

  .services-header {
    margin: 0;
    width: 100%;
    height: auto;
    padding: 0 25px;

    h2 {
      margin: 0 0 25px 0;
      font-size: 4.3em;
      color: ${COLORS.primaryBlue}
    }

    p {
      font-size: 1.8em;
    }

    @media screen and (max-width: 800px) {
      h2 {
        font-size: 3em;
      }
    }
  }

  .services-list {
    margin: 25px 0 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    list-style-type: none;
    padding: 13px;
  }
`;

function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

function Home({homeData}) {
  const mainImage = homeData[0].mainImage.asset;
  const overviewTitle = homeData[0].companyOverviewTitle;
  const overviewText = homeData[0].companyOverview[0].children[0].text;
  const servicesTitle = homeData[0].servicesOverviewTitle;
  const servicesText = homeData[0].servicesOverview[0].children[0].text;
  const serviceBlocks = homeData[0].servicesCopyBlock;
  const testimonialBlock = homeData[0].testimonial[0].testimonial[0].children[0].text;
  const testimonialByline = homeData[0].testimonial[0].byline;
  const testimonialSchool = homeData[0].testimonial[0].schoolChoice;

  return (
    <>
      <main>
        <MainImage>
          <div>
            <Image src={urlFor(mainImage).url()} alt="Page Image" layout="fill" objectFit="cover" objectPosition="50% 50%" priority />
          </div>
        </MainImage>
        <HeaderContent>
          <h2>{overviewTitle}</h2>
          <p>{overviewText}</p>
          <Link href="/about"><a>Learn More</a></Link>
        </HeaderContent>
        <ServicesContent>
          <div className="services-header">
            <h2>{servicesTitle}</h2>
            <p>{servicesText}</p>
          </div>
          <ul className="services-list">
            {serviceBlocks.map((block,idx) => <HomeServiceLink key={idx} image={block.blockImage.asset} title={block.serviceBlockTitle} textBlock={block.blockText} />)}
          </ul>
        </ServicesContent>
        <Testimonial serviceTitle={'home'} testimonialBlock={testimonialBlock} testimonialByline={testimonialByline} schoolChoice={testimonialSchool} />
      </main>
      <Footer primaryColor={COLORS.primaryBlue} />
    </>
  )
}

export async function getStaticProps() {
  const homeData = await client.fetch(`*[_type == 'homePage']`)
  return {
    props: {
      homeData,
    },
  }
}

export default Home;
