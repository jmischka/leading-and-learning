import client from "../client";
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import Image from "next/image";
import styled from 'styled-components';
import { COLORS } from "../styles/colors";
import AlternateFooter from "../components/alternateFooter";

const BlogpageStyles = styled.div`
    margin: 100px auto 0;
    width: 100%;
    max-width: 1450px;

    h1 {
        margin: 0 0 25px;
        font-size: 4.3em;
        line-height: 1.5;
        color: ${COLORS.primaryBlue};
        padding: 0 25px;
    }

    h2 {
        margin: 12px 0 0;
        font-size: 2.4em;
        line-height: 1.5;
        color: ${COLORS.primaryBlue};
    }

    p {
        font-size: 1.6em;
    }

    span {
        display: block;
        margin: 9px 0 0;
        font-size: 1.2em;
    }

    ul {
        position: relative;
        margin: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }

    li {
        position: relative;
        margin: 0;
        width: 33.333%;
        height: auto;
        padding: 25px;
        background: white;
        transition: .3s;
    }

    a {
        display: block;
        padding: 25px;
        border: 1px solid ${COLORS.primaryBlue};
        text-decoration: none;
        color: #333333;
        cursor: pointer;

        &:hover {
            border: 2px solid ${COLORS.primaryBlue};
        }
    }

    figure {
        position: relative;
        margin: 0;
        width: 100%;
        height: 0;
        padding-bottom: 66.666%;
    }

    @media screen and (max-width: 1000px) {
        li {
            width: 50%; 
        }
    }

    @media screen and (max-width: 800px) {
        h1 {
        margin: 0 0 0 0;
        font-size: 3em;
        }

        li {
            width: 100%; 
        }
    }
`;

function urlFor (source) {
    return imageUrlBuilder(client).image(source)
  }

function Blog({blogData}) {
    return (
        <>
            <main>
                <BlogpageStyles>
                    <h1>What we have to say...</h1>
                    <ul>
                        {blogData.length > 0 && blogData.map(data => {
                            return (
                                <li key={data._id}>
                                    <Link href="/posts/[slug]" as={`/posts/${data.slug.current}`}>
                                        <a>
                                            <figure>
                                                <Image src={urlFor(data.mainImage.asset).url()} alt="blog image" layout="fill" />
                                            </figure>
                                            <h2>{data.title}</h2>
                                            <p>{data.excerpt}</p>
                                        </a>
                                    </Link>{' '}
                                    <span>{new Date(data.publishedAt).toDateString()}</span>
                                </li>
                            )
                        }
                        )}
                    </ul>
                </BlogpageStyles>
            </main>
            <AlternateFooter />
        </>
    )
}

export async function getStaticProps() {
    const blogData = await client.fetch(`
        *[_type == "blog" && publishedAt < now()] | order(publishedAt desc)
    `)
    return {
        props: {
            blogData
        }
    }
}

export default Blog;