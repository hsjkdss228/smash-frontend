import styled from 'styled-components';
import NoticeList from './NoticeList';
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

const Functions = styled.div`
  
`;

export default function Notices({
  navigateBackward,
  notices,
  noticeStateToShow,
  showAll,
  showUnreadOnly,
  noticesDetailState,
  showNoticeDetail,
  closeNoticeDetail,
}) {
  const onClickBackward = () => {
    navigateBackward();
  };

  const handleClickShowNoticeDetail = ({ targetIndex, targetId }) => {
    showNoticeDetail({ targetIndex, targetId });
  };

  const handleClickCloseNoticeDetail = (targetIndex) => {
    closeNoticeDetail(targetIndex);
  };

  const handleClickShowAll = () => {
    showAll();
  };

  const handleClickShowUnreadOnly = () => {
    showUnreadOnly();
  };

  const filteredNotices = notices.filter((notice) => (
    noticeStateToShow === 'unread'
      ? notice.status === 'unread'
      : notice
  ));

  return (
    <Container>
      <TopSection>
        <BackwardButton
          type="button"
          onClick={onClickBackward}
        >
          ⬅️
        </BackwardButton>
        <Functions>
          <button
            type="button"
            onClick={handleClickShowAll}
          >
            모든 알림 확인
          </button>
          <button
            type="button"
            onClick={handleClickShowUnreadOnly}
          >
            읽지 않은 알림만 확인
          </button>
        </Functions>
      </TopSection>
      {(!notices || notices.length === 0) ? (
        <p>조회 가능한 알림이 없습니다.</p>
      ) : (
        <NoticeList
          notices={filteredNotices}
          noticeStateToShow={noticeStateToShow}
          noticesDetailState={noticesDetailState}
          onClickShowNoticeDetail={handleClickShowNoticeDetail}
          onClickCloseNoticeDetail={handleClickCloseNoticeDetail}
        />
      )}
    </Container>
  );
}
