import styled from 'styled-components';

import Container from './ui/ComponentScreenContainer';
import BackwardButton from './BackwardButton';
import NoticeList from './NoticeList';
import NoticeSettings from './NoticeSettings';
import useNoticeStore from '../hooks/useNoticeStore';

const BackwardAndSettings = styled.div`
  width: 100%;
  margin-bottom: 1.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Notices({
  navigateBackward,
}) {
  const handleClickBackward = () => {
    navigateBackward();
  };

  const noticeStore = useNoticeStore();

  const { serverError } = noticeStore;

  return (
    <Container>
      {serverError ? (
        <p>올비르지 않은 사용자 정보입니다.</p>
      ) : (
        <>
          <BackwardAndSettings>
            <BackwardButton
              onClick={handleClickBackward}
            />
            <NoticeSettings />
          </BackwardAndSettings>
          <NoticeList />
        </>
      )}
    </Container>
  );
}
