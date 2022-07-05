import client from '../../client'
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";
import styled from 'styled-components'
import Footer from '../../components/footer'
import { COLORS } from '../../styles/colors'
import AlternateFooter from '../../components/alternateFooter';

const PostStyles = styled.div`
    position: relative;
    margin: 50px auto 0;
    width: 100%;
    max-width: 1450px;
    height: auto;
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

    figure {
        position: relative;
        margin: 0;
        width: 100%;
        height: 0;
        padding-bottom: 66.666%;
    }

    @media screen and (max-width: 800px) {
        div {
            width: 100%;
        }

        figure {
            width: 100%; 
        }
    }
`;

const Header = styled.div`
    position: relative;
    margin: 0 0 25px 0 !important;
    width: 100% !important;
    height: auto;
    padding: 0 !important;

    h1 {
        margin: 0;
        font-size: 6em;
        font-weight: 400;
        line-height: 1.5;
        color: ${COLORS.primaryBlue}
    }

    span {
        display: block;
        margin: 0;
        width: 100%;
        font-size: 2.4em;
        font-weight: 400;
        line-height: 1.5;
        font-style: italic;

        &.blog-date {
            font-size: 1.6em;
            line-height: 1.5;
            font-style: italic;
        }
    }

    @media screen and (max-width: 800px) {
        h1 {
            font-size: 4em;;
        }
    }
`;

const Body = styled.div`
    position: relative;
    margin: 0;
    width: 100% !important;
    height: auto;
    padding: 0 !important;

    p {
        margin: 0 0 1.2em 0;
        font-size: 1.8em;
        font-weight: 400;
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
`;

function urlFor (source) {
    return imageUrlBuilder(client).image(source)
  }

function Post({post}) {
    const mainImage = post.mainImage.asset;
    const bodyText =  post.blogPost;

    return (
        <>
            <main>
                <PostStyles>
                    <FlexWrapper>
                        <div>
                            <figure>
                                <Image src={urlFor(mainImage).url()} alt="Page Image" layout="fill" />
                            </figure>    
                        </div>
                        <div>
                            <Header>
                                <h1>{post.title}</h1>
                                <span>{post.author}</span>
                                <span className='blog-date'>{new Date(post.publishedAt).toDateString()}</span>
                            </Header>
                            <Body>
                            {bodyText.map((copy,idx) => {
                                return (
                                    <p key={idx}>{copy.children.map((child,idx) => <span key={idx} className={child.marks.length ? child.marks.map(mark => mark).join(' ') : null}>{child.text}</span>)}</p>
                                )
                            })}
                            </Body>
                        </div>
                    </FlexWrapper>
                </PostStyles>
            </main>
            <AlternateFooter />
        </>
    )
}

export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type == "blog" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug) => ({params: {slug}})),
        fallback: false,
    }
}

export async function getStaticProps(context) {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = "" } = context.params
    const post = await client.fetch(`
        *[_type == "blog" && slug.current == $slug][0]
    `, { slug })
    return {
        props: {
        post
        }
    }
}

export default Post;