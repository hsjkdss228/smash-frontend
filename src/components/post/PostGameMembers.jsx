import styled from 'styled-components';

import usePostStore from '../../hooks/usePostStore';
import useGameStore from '../../hooks/useGameStore';
import useRegisterStore from '../../hooks/useRegisterStore';

import ComponentSectionContainer from '../ui/ComponentSectionContainer';

const Title = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 1em;
`;

const Member = styled.li`
  margin: 0 1em 1em;
  display: grid;
  grid-template-columns: 1fr 5fr 2fr;
  align-items: center;
`;

const MemberProfile = styled.div`
  font-size: .3em;
  margin-right: 2em;

  img {
    height: 12em;
    width: 12em;
    border-radius: 100%;
    object-fit: cover;
  }
`;

const MemberInformation = styled.div`
  margin-left: .5em;
  display: flex;
  flex-direction: column;
  gap: .3em;
`;

const NameAndGender = styled.div`
  display: flex;
  gap: 1em;
`;

const PhoneNumber = styled.div`
  
`;

const MemberScoreAndSeeProfile = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const Score = styled.p`
  font-size: .8em;
  margin-bottom: .5em;
`;

const SeeProfile = styled.button`
  font-size: .9em;
  padding: 0;
  text-align: right;

  :hover {
    color: #FF7A63;
  }
`;

const EnterChatRoomButton = styled.button`
  width: 100%;
  font-weight: bold;
  color: #FF7A63;
  padding: 1.25em;
  border: 1px solid #CCC;
  border-radius: 5px;
  background-color: #fff;

  :hover {
    color: #fff;
    border-color: transparent;
    background-color: #FF7A63;
  }

  :active {
    color: #fff;
    border-color: transparent;
    background-color: #090040;
  }

  :disabled {
    color: #fff;
    border-color: transparent;
    background-color: #A3A3A3;
    cursor: default;
  }
`;

export default function PostGameMembers() {
  const postStore = usePostStore();
  const gameStore = useGameStore();
  const registerStore = useRegisterStore();

  const { post } = postStore;
  const { game } = gameStore;
  const { members } = registerStore;

  if (members.length === 0) {
    return (
      <ComponentSectionContainer
        backgroundColor="#FFF"
      >
        <p>참가자가 없습니다.</p>
      </ComponentSectionContainer>
    );
  }

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
      <Title>
        참가자 정보
      </Title>
      <ul>
        {members.map((member) => (
          <Member
            className="member"
            key={member.registerId}
          >
            <MemberProfile>
              <img
                src={member.userInformation.profileImageUrl}
                alt="사용자 프로필 이미지"
              />
            </MemberProfile>
            <MemberInformation>
              <NameAndGender>
                <p>{member.userInformation.name}</p>
                <p>{member.userInformation.gender}</p>
              </NameAndGender>
              <PhoneNumber>
                <p>{member.userInformation.phoneNumber}</p>
              </PhoneNumber>
            </MemberInformation>
            <MemberScoreAndSeeProfile>
              <Score>
                평점:
                {' '}
                {member.userInformation.mannerScore}
              </Score>
              <SeeProfile>
                프로필 확인하기
              </SeeProfile>
            </MemberScoreAndSeeProfile>
          </Member>
        ))}
      </ul>
      {post.isAuthor || game.registerStatus === 'accepted' ? (
        <EnterChatRoomButton
          type="button"
        >
          팀 채팅방 입장하기
        </EnterChatRoomButton>
      ) : (
        null
      )}
    </ComponentSectionContainer>
  );
}
