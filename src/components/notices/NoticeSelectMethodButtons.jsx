import styled from 'styled-components';
import useNoticeStore from '../../hooks/useNoticeStore';

import SecondaryButton from '../ui/SecondaryButton';

const Container = styled.div`
  margin-bottom: 1.5em;
`;

export default function NoticeSelectMethodButtons() {
  const noticeStore = useNoticeStore();

  const handleClickSelectAllNotices = () => {
    noticeStore.selectAllNotices();
  };

  const handleClickDeselectAllNotices = () => {
    noticeStore.deselectAllNotices();
  };

  return (
    <Container>
      <SecondaryButton
        type="button"
        onClick={handleClickSelectAllNotices}
      >
        전체선택
      </SecondaryButton>
      <SecondaryButton
        type="button"
        onClick={handleClickDeselectAllNotices}
      >
        초기화
      </SecondaryButton>
    </Container>
  );
}
