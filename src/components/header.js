import { connect, styled, Global, css } from "frontity";
import Link from "./link";
import Nav from "./nav";
import NavTabletMobile from "./nav-mobile";
import MobileMenu from "./menu";
import SearchForm from "./search/search-form";
import LogoDark from '../../img/nirvana.jpg';
import JoinMobile from '../../img/join-mobile.svg';

import Toggle from "./toggle";

const Header = ({ state }) => {

// Dark Mode State
const { mode } = state.theme;

  return (
    <>
    <Global styles={ css`
        .header {
          border-bottom: ${mode === 'light' ? '1px solid #E3E3E3': '1px solid #686868'}
        }
    ` } />
      <Container className="header">
        <HeaderTop>
            <PrairieLogo>
                <StyledLink link="/">
                  <img src={LogoDark} alt="Nirvana Blog" style={{ width: '50px' }} />
                </StyledLink>
            </PrairieLogo>

            <JoinPrairie>
                <SearchBar>
                    <SearchForm />
                </SearchBar>
                <JoinBtn>
                    <a href={state.joinbutton.joinbuttonurl} target="_blank">{state.joinbutton.joinbuttonlabel}</a>
                </JoinBtn>

                <JoinBtnMobile>
                    <a href={state.joinbutton.joinbuttonurl} target="_blank"><img src={JoinMobile} alt="Hire Zakir" style={{ width: '32px', height: '32px'}}/></a>
                </JoinBtnMobile>
                <Toggle />
            </JoinPrairie>

        </HeaderTop>
        <MobileMenu />
      </Container>
      <NavDesktop>
        <Nav />
      </NavDesktop>
      <NavMobile>
        <NavTabletMobile />
      </NavMobile>

    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const Container = styled.div`
  box-sizing: border-box;
  padding: 24px 0 12px;
  margin-bottom: 14px;
  color: #fff;
`;

const HeaderTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const JoinPrairie = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;


const JoinBtn = styled.div`

    margin-left: 8px;

    @media (min-width: 721px) {
        display: block;
    }
    @media (max-width: 720px) {
        display: none;
    }

    a {
        background-color: #6D9147;
        color: #fff;
        border-radius: 4px;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 18px;
        padding: 7px 16px;
        display: inline-block;
        height: 32px;
        text-align: center;
        transition: all .5s linear;

        @media (max-width: 830px) {
            font-size: small;
            height: auto;
            padding: 7px;
        }
        &:hover {
            background-color: #4F6B32;
        }
    }
`;

const JoinBtnMobile = styled.div`

    @media (min-width: 721px) {
        display: none;
    }
    @media (max-width: 720px) {
        margin-left: 8px;
        display: block;
        line-height: 0.5;
    }
`;

const NavDesktop = styled.div`
    @media (min-width: 951px) {
        display: block;
    }
    @media (max-width: 950px) {
        display: none;
    }
`;
const NavMobile = styled.div`
    @media (min-width: 951px) {
        display: none;
    }
    @media (max-width: 950px) {
        display: block;
    }
`;

const PrairieLogo = styled.div`

    img {
        vertical-align: middle;
        border: 2px solid #111;
    }
`;

const SearchBar = styled.div`

`;
