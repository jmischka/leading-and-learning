import client from "../client";
import { COLORS } from "../styles/colors";
import styled from 'styled-components';
import AlternateFooter from "../components/alternateFooter";

const PageStyles = styled.div`
    position: relative;
    margin: 100px auto 0;
    width: 100%;
    max-width: 1450px;
    padding: 0 0 75px;

    h2 {
        margin: 0 0 25px;
        font-size: 4.3em;
        padding: 0 25px;
        color: ${COLORS.primaryBlue};
    }

    p {
        margin: 0 0 1.2em 0;
        font-size: 1.8em;
        padding: 0 25px;
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

    a {
        display: block;
        margin: 50px 25px 0;
        width: 125px;
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
            color: ${COLORS.primaryBlue}
        }
    }

    @media screen and (max-width: 800px) {
        margin: 50px auto 0;
        h2 {
            margin: 0 0 0 0;
            font-size: 4.2em;
        }
    }
`;

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

function Careers({careersData}) {
    const title = careersData[0].introTitle;
    const copyBlocks = careersData[0].introCopy;
    const buttonText = careersData[0].emailButtonText;

    return (
        <>
            <main>
                <VideoWrapper>
                    <video src="/careerVideo.mp4" autoPlay loop />
                </VideoWrapper>
                <PageStyles>
                    <h2>{title}</h2>
                    {copyBlocks.map((copy,idx) => {
                        return (
                            <p key={idx}>{copy.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                        )
                    })}
                    <a href="mailto: info@leadingandlearning.com">{buttonText}</a>
                </PageStyles>
            </main>
            <AlternateFooter />
        </>
    )
}

export async function getStaticProps() {
    const careersData = await client.fetch(`*[_type == 'careersPage']`)
    return {
      props: {
        careersData,
      },
    }
  }

export default Careers;