import styled from 'styled-components';

import useNoticeStore from '../hooks/useNoticeStore';

const ToggleButton = styled.button`
  color: ${({ selected }) => (
    selected ? '#fff' : '#FF7A63'
  )};
  padding: .5em 1.25em;
  border: ${({ selected }) => (
    selected ? '1px solid transparent' : '1px solid #CCC'
  )};
  border-radius: 5px;
  margin-inline: .3em;
  background-color: ${({ selected }) => (
    selected ? '#FF7A63' : '#fff'
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

const Container = styled.div`
  
`;

export default function NoticeSettings() {
  const noticeStore = useNoticeStore();

  const {
    selectNoticeMode,
    showAllNoticesMode,
    showUnreadNoticesMode,
  } = noticeStore;

  const handleClickSelectNoticeMode = () => {
    noticeStore.toggleSelectNoticeMode();
  };

  const handleClickShowAll = async () => {
    if (showAllNoticesMode) {
      return;
    }
    await noticeStore.showAll();
  };

  const handleClickShowUnreadOnly = async () => {
    if (showUnreadNoticesMode) {
      return;
    }
    await noticeStore.showUnreadOnly();
  };

  return (
    <Container>
      <ToggleButton
        type="button"
        selected={selectNoticeMode}
        onClick={handleClickSelectNoticeMode}
      >
        알림 선택
      </ToggleButton>
      <ToggleButton
        type="button"
        selected={showAllNoticesMode}
        onClick={handleClickShowAll}
      >
        모든 알림 확인
      </ToggleButton>
      <ToggleButton
        type="button"
        selected={showUnreadNoticesMode}
        onClick={handleClickShowUnreadOnly}
      >
        읽지 않은 알림만 확인
      </ToggleButton>
    </Container>
  );
}
