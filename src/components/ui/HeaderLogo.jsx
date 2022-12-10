import styled from 'styled-components';

import logoUrl from '../assets/images/ColorLogo.png';

const HeaderLogo = styled.h1`
  height: 2em;
  color: transparent;
  background-image: url(${logoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default HeaderLogo;
