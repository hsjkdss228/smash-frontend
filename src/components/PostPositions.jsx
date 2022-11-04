import styled from 'styled-components';

const Container = styled.article`
  
`;

const Team = styled.ul`
  
`;

const Position = styled.ul`
  
`;

const Member = styled.ul`
  
`;

export default function PostPositions({ teamsAndPositions }) {
  const handleClickRegisterExercise = () => {

  };

  return (
    <Container>
      <Team>
        {teamsAndPositions.map((team) => (
          <li key={team.id}>
            <p>{team.name}</p>
            <p>
              {team.membersCount}
              /
              {team.targetMembersCount}
              명
            </p>
            <Position>
              {team.positions.map((position) => (
                <li key={position.id}>
                  <p>{position.name}</p>
                  <p>
                    {position.currentParticipants}
                    명 신청 중/
                    {position.targetParticipantsCount}
                    명
                  </p>
                  {position.currentParticipants < position.targetParticipantsCount
                    ? (
                      <button
                        type="button"
                        onClick={handleClickRegisterExercise}
                      >
                        신청하기
                      </button>
                    ) : (
                      <p>신청마감</p>
                    )}
                  <Member>
                    {position.members.map((member) => (
                      <li key={member.id}>
                        <p>{member.name}</p>
                        <p>
                          매너점수:
                          {' '}
                          {member.mannerScore}
                          점
                        </p>
                      </li>
                    ))}
                  </Member>
                </li>
              ))}
            </Position>
          </li>
        ))}
      </Team>

    </Container>
  );
}