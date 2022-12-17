import styled from 'styled-components';

const BottomNavigatorButton = styled.button`
  height: 2em;
  color: transparent;
  background-image: url(${(props) => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default BottomNavigatorButton;
