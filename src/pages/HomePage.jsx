import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.article`
  height: 100vh;
`;

const Menus = styled.section`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 2fr 1.5fr 1.5fr 2fr 1fr;
`;

const NoticeSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
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

const RightPostSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const MyPostSection = styled.section`
  display: flex;
  justify-content: center;
`;

const CreateClubSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BestClubsSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClubsSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function HomePage() {
  const navigate = useNavigate();

  const handleClickButtons = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <Menus>
        <NoticeSection>
          <p>
            공지사항 표출 화면이 나타날 자리
          </p>
        </NoticeSection>
        <PostSection>
          <LeftPostSection>
            <p>
              긴급 모집 글이 리스트업될 자리
            </p>
            <button
              type="button"
              onClick={() => handleClickButtons('posts/list')}
            >
              운동 찾기
            </button>
          </LeftPostSection>
          <RightPostSection>
            <button
              type="button"
              onClick={() => handleClickButtons('posts/map')}
            >
              지도에서 운동 찾기
            </button>
            <button
              type="button"
              onClick={() => handleClickButtons('write')}
            >
              운동 모집하기
            </button>
          </RightPostSection>
        </PostSection>
        <MyPostSection>
          <button
            type="button"
            onClick={() => handleClickButtons('posts/list/enroll')}
          >
            내가 참가하는 운동 보기
          </button>
          <button
            type="button"
            onClick={() => handleClickButtons('posts/list/me')}
          >
            내가 모집하는 운동 보기
          </button>
        </MyPostSection>
        <CreateClubSection>
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
        </ClubsSection>
      </Menus>
    </Container>
  );
}
