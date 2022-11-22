import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  button {
    border: none;
    background: none;
  }

  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
