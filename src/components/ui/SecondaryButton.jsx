import styled from 'styled-components';

const SecondaryButton = styled.button`
  color: #FF7A63;
  padding: .5em 1.25em;
  border: 1px solid #CCC;
  border-radius: 5px;
  margin-inline: .3em;
  background-color: #fff;

  :hover {
    color: #fff;
    border-color: transparent;
    background-color: #FF7A63;
  }

  :active {
    color: #fff;
    border-color: transparent;
    background-color: #090040;
  }

  :disabled {
    color: #fff;
    border-color: transparent;
    background-color: #A3A3A3;
    cursor: default;
  }
`;

export default SecondaryButton;
