import styled from 'styled-components';

const Container = styled.section`
  
`;

export default function PostInformation({
  hits,
  authorName,
  authorPhoneNumber,
  detail,
}) {
  return (
    <Container>
      <p>
        조회수:
        {' '}
        {hits}
      </p>
      <p>
        작성자:
        {' '}
        {authorName}
      </p>
      <p>
        작성자 연락처:
        {' '}
        {authorPhoneNumber}
      </p>
      <p>
        {detail}
      </p>
    </Container>
  );
}
