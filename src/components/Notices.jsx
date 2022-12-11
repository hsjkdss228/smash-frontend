import styled from 'styled-components';

import { useState } from 'react';

import Container from './ui/ComponentScreenContainer';
import BackwardButton from './BackwardButton';
import NoticeList from './NoticeList';
import ComponentSectionContainer from './ui/ComponentSectionContainer';

const TopSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`;

const ToggleButton = styled.button`
  color: ${({ toggledState }) => (
    toggledState ? '#fff' : '#FF7A63'
  )};
  padding: .5em 1.25em;
  border: ${({ toggledState }) => (
    toggledState ? '1px solid transparent' : '1px solid #CCC'
  )};
  border-radius: 5px;
  margin-inline: .3em;
  background-color: ${({ toggledState }) => (
    toggledState ? '#FF7A63' : '#fff'
  )};

  :hover {
    color: #fff;
    border-color: transparent;
    background-color: #FF7A63;
  }

  :active {
    color: #fff;
    border-color: transparent;
    background-color: #090040;
  }
`;

const Functions = styled.div`
  
`;

const GuardWrapper = styled.div`
  font-size: .9em;
  font-weight: bold;
  text-align: center;
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
  const [selectNoticeButtonState, setSelectNoticeButtonState] = useState(false);
  const [allNoticesButtonState, setAllNoticesButtonState] = useState(true);
  const [unreadNoticesButtonState, setUnreadNoticesButtonState] = useState(false);

  const onClickBackward = () => {
    navigateBackward();
  };

  const handleClickShowAll = () => {
    showAll();
    setAllNoticesButtonState(true);
    setUnreadNoticesButtonState(false);
  };

  const handleClickShowUnreadOnly = () => {
    showUnreadOnly();
    setAllNoticesButtonState(false);
    setUnreadNoticesButtonState(true);
  };

  const handleClickShowNoticeDetail = ({ targetIndex, targetId }) => {
    showNoticeDetail({ targetIndex, targetId });
  };

  const handleClickCloseNoticeDetail = (targetIndex) => {
    closeNoticeDetail(targetIndex);
  };

  const handleClickToggleSelectNoticeState = () => {
    toggleSelectNoticeState();
    setSelectNoticeButtonState(!selectNoticeButtonState);
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
          <ToggleButton
            type="button"
            toggledState={selectNoticeButtonState}
            onClick={handleClickToggleSelectNoticeState}
          >
            알림 선택
          </ToggleButton>
          <ToggleButton
            type="button"
            toggledState={allNoticesButtonState}
            onClick={handleClickShowAll}
          >
            모든 알림 확인
          </ToggleButton>
          <ToggleButton
            type="button"
            toggledState={unreadNoticesButtonState}
            onClick={handleClickShowUnreadOnly}
          >
            읽지 않은 알림만 확인
          </ToggleButton>
        </Functions>
      </TopSection>
      {(!notices || notices.length === 0) ? (
        <ComponentSectionContainer>
          <GuardWrapper>
            <p>조회 가능한 알림이 없습니다.</p>
          </GuardWrapper>
        </ComponentSectionContainer>
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
