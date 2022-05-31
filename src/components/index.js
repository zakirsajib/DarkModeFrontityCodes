import { useRef, useEffect } from "react";
import { loadable, Global, css, connect, styled, Head } from "frontity";
import AOS from 'aos';
import aos from 'aos/dist/aos.css';
//import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
//import { useLocomotiveScroll } from 'react-locomotive-scroll';
import Switch from "@frontity/components/switch";
//import Header from "./header";
//import Footer from "./footer";
//import ListHome from "./list/list";
//import ListCat from "./list/list-tax-infinite";
//import Post from "./post";
import Loading from "./loading";
import { Transition } from "react-transition-group";
import Title from "./title";
//import PageError from "./page-error";
import FontFaces from "./styles/font-faces";
import Arrow from '../../img/arrow.svg';

// Thanks to loadable we prevent component from loading until it's needed.
const Header = loadable(() => import('./header'));
const Footer = loadable(() => import('./footer'));
const ListHome = loadable(() => import('./list/list'));
const ListCat = loadable(() => import('./list/list-tax-infinite'));
const Post = loadable(() => import('./post'));
const Page = loadable(() => import('./page'));
const PageError = loadable(() => import('./page-error'));



/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */

const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Dark Mode
  const { mode } = state.theme;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
        <link rel="canonical" href={state.router.link} />
      </Head>

      {/* Add some global styles for the whole site, like body or a's.
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />
      <Global styles={aos} />
      <Global styles={ css`
        body {
            background-color: ${mode === 'light' ? '#FDFCFD': '#222'};
            color: ${mode === 'light' ? '#222': '#FDFCFD'}
        }
        nav > li > a,
        .carousel ul li a {
          color: ${mode === 'light' ? '#183F4F': '#686868'}
        }
        hr {
          border-color: ${mode === 'light' ? '#E3E3E3': '#686868'};
        }
        .BackBtn,
        .NextBtn
        .loading {
          filter: ${mode === 'light' ? 'invert(0)': 'invert(1)'}
        }
        .PostTime span {
          background-color: ${mode === 'light' ? '#e1e1e1': '#686868'};
        }
        ` } />
      <FontFaces />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}



      <Main id={ `_totalResults${data.total}` } className={ `_authorName${data.isAuthor}` }>
        <Switch>
          <Loading when={data.isFetching} />
          <ListHome when={data.isHome} />
          <ListCat when={data.isArchive} />
          <Page when={data.isPage} />
          <Post when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </Main>
     <Footer />

    </>
  );
};

export default connect(Theme);

const globalStyles = css`

  * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html, body {
    overflow-x: hidden;
  }

  body {
    margin: 0;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    counter-reset: my-sec-counter;
    text-rendering: optimizeLegibility;
  }
  a {
    color: #6D9147;
    text-decoration: none;
    transition: all .5s linear;
  }
  a:hover {
      color: #2A440E;
  }

  hr {
      border-width: 1px;
      border-style: solid;
      width: 100vw;
      position: relative;
      margin-left: -50vw;
      left: 50%;
  }

  .SortContainer {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 60px;
  }

  div#_totalResults0 .SortContainer {
    display: none;
  }

  .SortLabel {
      margin-right: 24px;
  }
  .SortLabel h3 {
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 26px;
      color: #183F4F;
  }
  select {
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      appearance: none;
      outline: 0;
      box-shadow: none;
      border: 0 !important;
      background: transparent;
      background-image: none;
  }
    select::-ms-expand {
        display: none;
    }
    .SortSelect {
      position: relative;
      display: flex;
      height: 2.5em;
      line-height: 3;
      overflow: hidden;
      width: 188px;
      max-width: 188px;
      border-bottom: 1px solid #183F4F;
    }
    select {
      flex: 1;
      padding: 0 0.5em;
      color: #183F4F;
      cursor: pointer;
      line-height: 26px;
      font: 400 1.25rem 'DM Sans';
    }
    .SortSelect::after {
      content: "";
      background: url(${Arrow});
      background-position: 0 50%;
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0;
      cursor: pointer;
      pointer-events: none;
      -webkit-transition: .25s all ease;
      -o-transition: .25s all ease;
      transition: .25s all ease;
      width: 14px;
      height: 40px;
    }
    .SortSelect:hover::after {
        color: #f39c12;
    }
`;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  margin: auto;
  padding-left: 60px;
  padding-right: 60px;
  @media (max-width: 800px) {
      padding-left: 40px;
      padding-right: 40px;
  }
  @media (max-width: 768px) {
      padding-left: 24px;
      padding-right: 24px;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
`;
