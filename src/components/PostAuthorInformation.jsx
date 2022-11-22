import styled from 'styled-components';

const Container = styled.section`
  padding: 1em;
  border: 1px solid #000;
  margin-bottom: 2em;
  display: flex;
  align-items: center;
`;

const AuthorProfile = styled.div`
  font-size: .3em;
  margin-right: 2em;
`;

const AuthorInformation = styled.div`
  
`;

const AuthorName = styled.p`
  font-size: 1.2em;
`;

export default function PostAuthorInformation({
  authorName,
  authorPhoneNumber,
}) {
  return (
    <Container>
      <AuthorProfile>
        <p>작성자 프로필 사진</p>
        <p>Comming soon...</p>
      </AuthorProfile>
      <AuthorInformation>
        <AuthorName>
          {authorName}
        </AuthorName>
        <p>
          {authorPhoneNumber}
        </p>
      </AuthorInformation>
    </Container>
  );
}
