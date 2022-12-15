import styled from 'styled-components';

import useGameStore from '../hooks/useGameStore';
import usePlaceStore from '../hooks/usePlaceStore';
import usePostStore from '../hooks/usePostStore';

import ComponentSectionContainer from './ui/ComponentSectionContainer';

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

export default function PostGame() {
  const postStore = usePostStore();
  const gameStore = useGameStore();
  const placeStore = usePlaceStore();

  const { post } = postStore;
  const { game } = gameStore;
  const { place } = placeStore;

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
      <ExerciseName>
        {game.type}
      </ExerciseName>
      <DateAndPlace>
        <p>{game.date}</p>
        <p>{place.name}</p>
      </DateAndPlace>
      <MembersCreatedAtAndHits>
        <Members>
          {game.currentMemberCount}
          /
          {game.targetMemberCount}
          명 참가 중
        </Members>
        <CreatedAtAndHits>
          {/* TODO: 작성시간을 가져와서 전달받아야 함 */}
          <CreatedAt>
            작성시간
          </CreatedAt>
          <Hits>
            {post.hits}
            {' '}
            조회
          </Hits>
        </CreatedAtAndHits>
      </MembersCreatedAtAndHits>
    </ComponentSectionContainer>
  );
}
