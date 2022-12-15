import styled from 'styled-components';

import Container from './ui/ComponentScreenContainer';
import BackwardButton from './BackwardButton';
import NoticeList from './NoticeList';
import NoticeSettings from './NoticeSettings';

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

  return (
    <Container>
      <BackwardAndSettings>
        <BackwardButton
          onClick={handleClickBackward}
        />
        <NoticeSettings />
      </BackwardAndSettings>
      <NoticeList />
    </Container>
  );
}
