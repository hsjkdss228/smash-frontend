import styled from 'styled-components';

const LoginLogo = styled.h1`
  height: 7em;
  width: 80%;
  margin-bottom: 3em;
  color: transparent;
  background-image: url(${(props) => props.logoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default LoginLogo;
