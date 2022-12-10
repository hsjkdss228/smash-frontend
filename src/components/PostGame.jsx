import styled from 'styled-components';

import Container from './ui/ComponentSectionContainer';

const ExerciseName = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: .9em;
  color: #FF7A63;
`;

const DateAndPlace = styled.div`
  font-size: .8em;

  p:first-child {
    margin-bottom: .5em;
  }
`;

const MembersCreatedAtAndHits = styled.div`
  margin-top: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Members = styled.p`
  font-size: 1em;
`;

const CreatedAtAndHits = styled.div`
  font-size: .9em;
  display: flex;
  gap: 1.5em;
`;

const CreatedAt = styled.p`
  
`;

const Hits = styled.p`
  
`;

export default function PostGame({
  name,
  date,
  place,
  currentMemberCount,
  targetMemberCount,
  hits,
}) {
  return (
    <Container>
      <ExerciseName>
        {name}
      </ExerciseName>
      <DateAndPlace>
        <p>{date}</p>
        <p>{place}</p>
      </DateAndPlace>
      <MembersCreatedAtAndHits>
        <Members>
          {currentMemberCount}
          /
          {targetMemberCount}
          명 참가 중
        </Members>
        <CreatedAtAndHits>
          {/* TODO: 작성시간을 가져와서 전달받아야 함 */}
          <CreatedAt>
            작성시간
          </CreatedAt>
          <Hits>
            {hits}
            {' '}
            조회
          </Hits>
        </CreatedAtAndHits>
      </MembersCreatedAtAndHits>
    </Container>
  );
}
