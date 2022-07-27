import client from "../client";
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";
import styled from "styled-components";
import { COLORS } from "../styles/colors";

const ImageStyles = styled.div`
  position: relative;
  margin: 100px 0 25px 0;
  width: 100%;
  height: auto;

  figure {
    position: relative;
    margin: 0;
    width: 100%;
    height: 0;
    padding-bottom: 33.333%;

    @media screen and (max-width: 780px) {
      width: 200%;
      padding-bottom: 66.666%;
    }
  }

  a {
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 260px;
      transform: translate(-50%,-50%);
      padding: 16px 20px;
      background-color: transparent;
      outline: none;
      border: none;
      cursor: pointer;
      text-decoration: none;

      span.tint {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -10;
        opacity: .85;
        transition: .3s;
      }

      span.text {
        display: block;
        font-family: 'AvenirNextLTW02', -apple-system, Helvetica Neue, sans-serif;
        font-size: 2.4em;
        line-height: 1;
        color: white;
      }

      &:hover {
        span.tint {
          background-color: white !important;
        }

        span.text {
          color: ${COLORS.primaryBlue};
        }
      }

      @media screen and (max-width: 800px) {
        width: 225px;

        span.text {
          font-size: 2em;
        }
    }
  }
`;

function urlFor (source) {
    return imageUrlBuilder(client).image(source)
  }

export default function SecondImage({image, buttonText, serviceTitle, brochure}) {

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

    let primaryColor = colorFinder(serviceTitle);

    const handleMouseEnter = (e) => {
      let text = e.target.nextElementSibling;
      text.style.color = primaryColor;
    };

    const handleMouseLeave = (e) => {
      let text = e.target.nextElementSibling;
      text.style.color = 'white';
    };

    return (
        <ImageStyles>
            <figure>
                <Image src={urlFor(image).url()} alt="Page Image" layout="fill" />
            </figure>
            <a href={`${brochure}?dl=`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <span className="tint" style={{backgroundColor: primaryColor}} />
              <span className="text">{buttonText}</span>
            </a>
        </ImageStyles>
    )
}