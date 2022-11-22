import styled from 'styled-components';

const Container = styled.section`
  padding: 1em;
  border: 1px solid #000;
  margin-bottom: 2em;
  font-size: 1.2em;
`;

export default function PostDetail({
  detail,
}) {
  return (
    <Container>
      {detail}
    </Container>
  );
}
