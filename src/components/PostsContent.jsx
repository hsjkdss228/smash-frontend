import styled from 'styled-components';

const Container = styled.button`
  font-size: 1.05em;
  padding: 1em;
  border: 1px solid #000;
`;

const HitsAndType = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const DateAndPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1em;
`;

const MemberCount = styled.div`
  display: flex;
  justify-content: space-between;
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
      <HitsAndType>
        <p>
          {hits}
          {' '}
          hits
        </p>
        <p>{type}</p>
      </HitsAndType>
      <DateAndPlace>
        <p>{date}</p>
        <p>{place}</p>
      </DateAndPlace>
      <MemberCount>
        <p>
          {currentMemberCount}
          /
          {targetMemberCount}
          명 참가 중
        </p>
        <p>상세 내용 보기</p>
      </MemberCount>
    </Container>
  );
}
