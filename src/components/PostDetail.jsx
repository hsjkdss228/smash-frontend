import styled from 'styled-components';
import usePostStore from '../hooks/usePostStore';

const Container = styled.section`
  font-size: .8em;
  padding: 1em;
  border: 1px solid #ccc;
  margin-bottom: 1em;
  line-height: 1.2;
`;

const Detail = styled.pre`
  white-space: pre-wrap;
  word-break: keep-all;
  overflow: auto;
`;

export default function PostDetail() {
  const postStore = usePostStore();

  const { post } = postStore;

  return (
    <Container>
      <Detail>
        {post.detail}
      </Detail>
    </Container>
  );
}
