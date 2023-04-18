import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body, #root {
    font-family: Catamaran, Helvetica Neue, Helvetica, Arial, sans-serif;
    font-weight: 500;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;
