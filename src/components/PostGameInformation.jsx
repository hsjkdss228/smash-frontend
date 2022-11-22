import styled from 'styled-components';

const Container = styled.section`
  padding: 1em;
  border: 1px solid #000;
  margin: 1em 0 2em;
`;

const Type = styled.p`
  font-size: 2em;
`;

const DateAndPlace = styled.div`
  font-size: 1.5em;
  margin-bottom: 1em;
`;

const MembersAndHits = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Members = styled.p`
  font-size: 1.2em;
`;

export default function PostGameInformation({
  type,
  date,
  place,
  currentMemberCount,
  targetMemberCount,
  hits,
}) {
  return (
    <Container>
      <Type>
        {type}
      </Type>
      <DateAndPlace>
        <p>{date}</p>
        <p>{place}</p>
      </DateAndPlace>
      <MembersAndHits>
        <Members>
          {currentMemberCount}
          /
          {targetMemberCount}
          명 참가 중
        </Members>
        <p>
          {hits}
          {' '}
          hits
        </p>
      </MembersAndHits>
    </Container>
  );
}
