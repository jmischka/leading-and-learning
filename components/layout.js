import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'
import Header from './header';

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'AvenirNextLTW02';
    src: url('/fonts/AvenirNextLTW02-Regular.woff2') format('woff2'),
         url('/fonts/AvenirNextLTW02-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;

}

/* @font-face {
    font-family: 'bodoni_72_oldstylebook';
    src: url('/fonts/bodonisvtytwoositctt-book-01-webfont.woff2') format('woff2'),
         url('/fonts/bodonisvtytwoositctt-book-01-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
} */

html {
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
*, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
}

html {
    --primaryBlue: #456b79;
    --secondaryBlue: #7e98a1;
    --tertiaryBlue: #b2c1c7;
    --blueBackground: #E0E6E8;
    --primaryGreen: #456c50; 
    --secondaryGreen: #7d9885;
    --tertiaryGreen: #b1c1b6;
}
  
body {
    padding: 0;
    margin: 0;
    font-family: 'AvenirNextLTW02', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 10px;
    line-height: 1.5;
    font-style: normal;
    color: #333333;
}

p {
    margin: 0;
    font-size: 1.8em;
    line-height: 1.5;
    font-style: normal;
}

main {
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: auto;
    min-height: 100vh;
    padding: 115px 0 75px;
    overflow-x: hidden;
}

.content-wrapper {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1500px;
    height: auto;
    padding: 25px;
}
`

function Layout({ children }) {
    return (
        <>
            <GlobalStyle />
            <Head>
                <title>Leading and Learning</title>
                <link rel="icon" type="image/png" href="/L&L_FAVICON.png" />
                <link rel="preload" href="/fonts/AvenirNextLTW02-Regular.woff2" as="font" crossOrigin="" />
                <link rel="preload" href="/fonts/AvenirNextLTW02-Regular.woff" as="font" crossOrigin="" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&display=swap" rel="stylesheet" />
            </Head>
            <Header />
            <div>
                { children }
            </div>
        </>
    )
}

export default Layout;