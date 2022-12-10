import styled from 'styled-components';

const Container = styled.section`
  font-size: .8em;
  padding: 1em;
  border: 1px solid #ccc;
  margin-bottom: 1em;
  line-height: 1.2;
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
