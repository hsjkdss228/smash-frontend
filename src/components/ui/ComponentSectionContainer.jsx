import styled from 'styled-components';

const ComponentSectionContainer = styled.article`
  width: 100%;
  padding: 1em;
  border: 1px solid #ccc;
  margin-bottom: 1em;
  background-color: ${(props) => props.backgroundColor};
`;

export default ComponentSectionContainer;
