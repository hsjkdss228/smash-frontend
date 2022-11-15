import styled from 'styled-components';

const Container = styled.button`
  
`;

export default function PostsContent({
  hits,
  type,
  date,
  place,
  currentMemberCount,
  targetMemberCount,
  onClickPost,
}) {
  const handleClickPostButton = () => {
    onClickPost();
  };

  return (
    <Container
      type="button"
      onClick={handleClickPostButton}
    >
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
