import styled from 'styled-components';

import Container from './ui/ComponentScreenContainer';
import BackwardButton from './BackwardButton';
import NoticeList from './NoticeList';

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
  selectNoticeState,
  toggleSelectNoticeState,
  noticesSelectedState,
  selectNotice,
  selectAllNotices,
  deselectAllNotices,
  readSelectedNotices,
  deleteSelectedNotices,
}) {
  const onClickBackward = () => {
    navigateBackward();
  };

  const handleClickShowAll = () => {
    showAll();
  };

  const handleClickShowUnreadOnly = () => {
    showUnreadOnly();
  };

  const handleClickShowNoticeDetail = ({ targetIndex, targetId }) => {
    showNoticeDetail({ targetIndex, targetId });
  };

  const handleClickCloseNoticeDetail = (targetIndex) => {
    closeNoticeDetail(targetIndex);
  };

  const handleClickToggleSelectNoticeState = () => {
    toggleSelectNoticeState();
  };

  const handleClickSelectNotice = ({ targetIndex, targetId }) => {
    selectNotice({ targetIndex, targetId });
  };

  const handleClickSelectAllNotices = () => {
    selectAllNotices();
  };

  const handleClickDeselectAllNotices = () => {
    deselectAllNotices();
  };

  const handleClickReadSelectedNotices = () => {
    readSelectedNotices();
  };

  const handleClickDeleteSelectedNotices = () => {
    deleteSelectedNotices();
  };

  return (
    <Container>
      <TopSection>
        <BackwardButton
          onClick={onClickBackward}
        />
        <Functions>
          <button
            type="button"
            onClick={handleClickToggleSelectNoticeState}
          >
            알림 선택
          </button>
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
          notices={notices}
          noticeStateToShow={noticeStateToShow}
          noticesDetailState={noticesDetailState}
          onClickShowNoticeDetail={handleClickShowNoticeDetail}
          onClickCloseNoticeDetail={handleClickCloseNoticeDetail}
          selectNoticeState={selectNoticeState}
          noticesSelectedState={noticesSelectedState}
          onClickSelectNotice={handleClickSelectNotice}
          onClickSelectAllNotices={handleClickSelectAllNotices}
          onClickDeselectAllNotices={handleClickDeselectAllNotices}
          onClickReadSelectedNotices={handleClickReadSelectedNotices}
          onClickDeleteSelectedNotices={handleClickDeleteSelectedNotices}
        />
      )}
    </Container>
  );
}
