import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
        font: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font: 300 18px "Poppins", sans-serif;
    }

    body {
        font-size: 1rem;
        margin: 0;
        padding: 0;
        background-color: ${({ theme }) => theme.light};
        overflow-x: hidden;

        &.modalOpened {
            overflow: hidden;
            pointer-events: none;
        }
    }

    #root {
        padding: 0 1em;
    }

`;

export default GlobalStyle;
