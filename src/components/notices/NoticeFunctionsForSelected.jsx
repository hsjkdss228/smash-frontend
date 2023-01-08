import styled from 'styled-components';
import useNoticeStore from '../../hooks/useNoticeStore';

import SecondaryButton from '../ui/SecondaryButton';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function NoticeFunctionsForSelected() {
  const noticeStore = useNoticeStore();

  const handleClickReadSelectedNotices = async () => {
    await noticeStore.readSelectedNotices();
  };

  const handleClickDeleteSelectedNotices = async () => {
    await noticeStore.deleteSelectedNotices();
  };

  return (
    <Container>
      <SecondaryButton
        type="button"
        onClick={handleClickReadSelectedNotices}
      >
        읽은 알림으로 처리
      </SecondaryButton>
      <SecondaryButton
        type="button"
        onClick={handleClickDeleteSelectedNotices}
      >
        삭제
      </SecondaryButton>
    </Container>

  );
}
