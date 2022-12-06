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

const NoticeTitle = styled.li`
  font-size: .75em;
  display: flex;
  gap: .5em;
`;

const NoticeDetail = styled.div`
  
`;

export default function Notices({
  notices,
  noticesDetailState,
  showNoticeDetail,
  navigateBackward,
}) {
  const onClickBackward = () => {
    navigateBackward();
  };

  const handleClickShowNoticeDetail = (targetIndex) => {
    showNoticeDetail(targetIndex);
  };

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
      {(!notices || notices.length === 0) ? (
        <p>조회 가능한 알림이 없습니다.</p>
      ) : (
        <NoticeList>
          {notices.map((notice, index) => (
            <>
              <NoticeTitle key={notice.id}>
                <button
                  type="button"
                  onClick={() => handleClickShowNoticeDetail(index)}
                >
                  <p>{notice.createdAt}</p>
                  <p>{notice.title}</p>
                </button>
              </NoticeTitle>
              {noticesDetailState[index] && (
                <NoticeDetail>
                  <p>{notice.detail}</p>
                </NoticeDetail>
              )}
            </>
          ))}
        </NoticeList>
      )}
    </Container>
  );
}
