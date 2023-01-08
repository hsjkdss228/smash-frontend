import styled from 'styled-components';

import usePostStore from '../../hooks/usePostStore';

const Container = styled.section`
  margin: 0 1em 1em;
  display: grid;
  grid-template-columns: 1fr 5fr 2fr;
  align-items: center;
`;

const AuthorProfile = styled.div`
  font-size: .3em;
  margin-right: 2em;

  img {
    height: 12em;
    width: 12em;
    object-fit: cover;
    border-radius: 100%;
  }
`;

const AuthorInformation = styled.div`
  margin-left: .5em;
`;

const AuthorName = styled.p`
  font-size: 1em;
  margin-bottom: .3em;
`;

const AuthorPhoneNumber = styled.p`
  font-size: 1em;
`;

const AuthorScoreAndSeeProfile = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const Score = styled.p`
  font-size: .8em;
  margin-bottom: .75em;
`;

const SeeProfile = styled.button`
  font-size: .9em;
  padding: 0;
  text-align: right;

  :hover {
    color: #FF7A63;
  }
`;

export default function PostAuthor() {
  const postStore = usePostStore();

  const { post } = postStore;

  return (
    <Container>
      <AuthorProfile>
        <img
          src={post.authorInformation.profileImageUrl}
          alt="사용자 프로필 이미지"
        />
      </AuthorProfile>
      <AuthorInformation>
        <AuthorName>
          {post.authorInformation.name}
        </AuthorName>
        <AuthorPhoneNumber>
          {post.authorInformation.phoneNumber}
        </AuthorPhoneNumber>
      </AuthorInformation>
      <AuthorScoreAndSeeProfile>
        <Score>
          평점:
          {' '}
          {post.authorInformation.mannerScore}
        </Score>
        <SeeProfile
          type="button"
        >
          프로필 확인하기
        </SeeProfile>
      </AuthorScoreAndSeeProfile>
    </Container>
  );
}
