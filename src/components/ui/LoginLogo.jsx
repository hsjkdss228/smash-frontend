import styled from 'styled-components';

import logoUrl from '../assets/images/BlackLogo.png';

const LoginLogo = styled.h1`
  height: 7em;
  width: 80%;
  margin-bottom: 3em;
  color: transparent;
  background-image: url(${logoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default LoginLogo;
