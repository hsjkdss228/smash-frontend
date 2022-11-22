import styled from 'styled-components';

const Container = styled.article`
  padding: 1em;
  border: 1px solid #000;
  margin-bottom: 2em;
`;

const Title = styled.p`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: .5em;
`;

const Member = styled.li`
  font-size: 1.2em;
  text-align: center;
  display: grid;
  grid-template-columns: 2fr 1.1fr 3fr;
  margin-bottom: .3em;
`;

export default function PostGameMembersInformation({ members }) {
  if (members.length === 0) {
    return (
      <Container>
        <p>참가자가 없습니다.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>참가자 정보</Title>
      <ul>
        {members.map((member) => (
          <Member key={member.id}>
            <p>{member.name}</p>
            <p>{member.gender}</p>
            <p>{member.phoneNumber}</p>
          </Member>
        ))}
      </ul>
    </Container>
  );
}
