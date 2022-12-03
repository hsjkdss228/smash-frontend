import styled from 'styled-components';
import BackwardButton from './ui/BackwardButton';

const Container = styled.article`
  padding: 30px 0 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const NoticeList = styled.ul`
  
`;

const Notice = styled.li`
  font-size: .75em;
  display: flex;
  gap: .5em;
`;

export default function Notices({
  notices,
  navigateBackward,
}) {
  const onClickBackward = () => {
    navigateBackward();
  };

  if (!notices || notices.length === 0) {
    return (
      <p>조회 가능한 알림이 없습니다.</p>
    );
  }

  return (
    <Container>
      <TopSection>
        <BackwardButton
          type="button"
          onClick={onClickBackward}
        >
          ⬅️
        </BackwardButton>
      </TopSection>
      <NoticeList>
        {notices.map((notice) => (
          <Notice key={notice.id}>
            <p>{notice.createdAt}</p>
            <p>{notice.title}</p>
          </Notice>
        ))}
      </NoticeList>
    </Container>
  );
}
