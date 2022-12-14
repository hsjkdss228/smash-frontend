import styled from 'styled-components';

const PrimaryButton = styled.button`
  color: #fff;
  padding: .5em 1.25em;
  border-radius: 5px;
  margin-inline: .3em;
  background-color: #FF7A63;

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

export default PrimaryButton;
