import styled from 'styled-components';

const Container = styled.article`
  
`;

const Member = styled.li`
  display: flex;
`;

export default function PostMemberInformation({ members }) {
  return (
    <Container>
      <p>참가자 정보</p>
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