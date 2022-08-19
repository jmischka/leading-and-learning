import client from "../client";
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";
import styled from "styled-components";

const MainImage = styled.div`
  position: relative;
  margin: 0 0 125px 0;
  width: 100%;
  height: calc(100vh - 115px);
  overflow: hidden;

  figure {
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

  @media screen and (max-width: 800px) {
    margin: 0 0 75px 0;
  }
`;

function urlFor (source) {
    return imageUrlBuilder(client).image(source)
  }

export default function HeroImage({image}) {
    return (
        <MainImage>
            <figure>
                <Image src={urlFor(image).url()} alt="Page Image" layout="fill" objectFit="cover" objectPosition="50% 50%" unoptimized={true} priority />
            </figure>
        </MainImage>
    )
}