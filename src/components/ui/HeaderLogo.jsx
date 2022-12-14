import styled from 'styled-components';

const HeaderLogo = styled.h1`
  height: 2em;
  color: transparent;
  background-image: url(${(props) => props.logoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default HeaderLogo;
