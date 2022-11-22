import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.article`
  
`;

const Menus = styled.section`
  padding-block: 30px;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const PostSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftPostSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RecommendedPosts = styled.div`
  padding: 2em;
`;

const PostsButton = styled.button`
  font-size: 1.5em;
  padding: 2em;
`;

const RightPostSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const PostsMapButton = styled.button`
  font-size: 1.2em;
  padding: 2em;
`;

const CreatePostButton = styled.button`
  font-size: 1.2em;
  padding: 2em;
`;

const MyPostSection = styled.section`
  display: flex;
  justify-content: center;
`;

const EnrolledPostsButton = styled.button`
  padding: 2em;
`;

const MyPostsButton = styled.button`
  padding: 2em;
`;

// const CreateClubSection = styled.section`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const BestClubsSection = styled.section`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ClubsSection = styled.section`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

export default function HomePage() {
  const navigate = useNavigate();

  const handleClickButtons = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Menus>
        <PostSection>
          <LeftPostSection>
            <RecommendedPosts>
              <p>마감 임박 모집 글</p>
              <p>Comming soon...</p>
            </RecommendedPosts>
            <PostsButton
              type="button"
              onClick={() => handleClickButtons('posts/list')}
            >
              운동 찾기
            </PostsButton>
          </LeftPostSection>
          <RightPostSection>
            <PostsMapButton
              type="button"
              onClick={() => handleClickButtons('posts/map')}
            >
              지도에서 운동 찾기
            </PostsMapButton>
            <CreatePostButton
              type="button"
              onClick={() => handleClickButtons('write')}
            >
              운동 모집하기
            </CreatePostButton>
          </RightPostSection>
        </PostSection>
        <MyPostSection>
          <EnrolledPostsButton
            type="button"
            onClick={() => handleClickButtons('posts/list/enroll')}
          >
            <p>내가 참가하는 운동 보기</p>
            <p>Comming Soon...</p>
          </EnrolledPostsButton>
          <MyPostsButton
            type="button"
            onClick={() => handleClickButtons('posts/list/me')}
          >
            <p>내가 모집하는 운동 보기</p>
            <p>Comming Soon...</p>
          </MyPostsButton>
        </MyPostSection>
        {/* <CreateClubSection>
          <button
            type="button"
            onClick={() => handleClickButtons('clubs/create')}
          >
            클럽 생성하기
          </button>
        </CreateClubSection>
        <BestClubsSection>
          <p>
            이번 주 인기 클럽 목록이 리스트업될 자리
          </p>
        </BestClubsSection>
        <ClubsSection>
          <button
            type="button"
            onClick={() => handleClickButtons('clubs')}
          >
            클럽 보러 가기
          </button>
        </ClubsSection> */}
      </Menus>
    </Container>
  );
}
