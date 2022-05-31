import React from "react";
import { connect, styled } from "frontity";

const Toggle = ({ actions, state }) => {
    const { setLightMode, setDarkMode } = actions.theme;
    const { mode } = state.theme;
    return (
        <Container>
            <ButtonsStyled isSelected={ mode === 'light' } onClick={ setLightMode }>☀️</ButtonsStyled>
            <ButtonsStyled isSelected={ mode === 'dark' } onClick={ setDarkMode }>🌒</ButtonsStyled>
        </Container>
    )
}

export default connect(Toggle);

const Container = styled.div`
    display: flex;
    margin-left: 8px;
`;

const ButtonsStyled = styled.button`
    border: 0;
    cursor: pointer;
    font-size: 24px;
    background: transparent;
    transition: all 0.2s ease-in-out;
    display: ${({ isSelected }) => (isSelected ? 'none': 'block')};
    //background-color: ${({ isSelected }) => (isSelected ? '#222': '#fff')};
`;
