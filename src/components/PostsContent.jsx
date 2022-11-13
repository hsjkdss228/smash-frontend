import styled from 'styled-components';

const Container = styled.section`
  
`;

export default function PostsContent({
  hits,
  type,
  date,
  place,
  currentMemberCount,
  targetMemberCount,
}) {
  return (
    <Container>
      <p>
        조회수:
        {' '}
        {hits}
      </p>
      <p>{type}</p>
      <p>{date}</p>
      <p>{place}</p>
      <p>
        {currentMemberCount}
        /
        {targetMemberCount}
        명
      </p>
    </Container>
  );
}
