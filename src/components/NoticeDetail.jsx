import styled from 'styled-components';

import useNoticeStore from '../hooks/useNoticeStore';

const Container = styled.div`
  padding: 1em;
  border: 1px solid #CCC;
  margin-inline: 1em;
  background-color: #F9F9F9;
  display: flex;
  flex-direction: column;
`;

const DetailText = styled.p`
  font-size: .8em;
`;

const CloseButton = styled.button`
  color: #fff;
  padding: .6em 1.4em;
  border-radius: 5px;
  align-self: flex-end;
  background-color: #000;
`;

export default function NoticeDetail({
  notice,
  index,
}) {
  const noticeStore = useNoticeStore();

  const handleClickCloseNoticeDetail = (targetIndex) => {
    noticeStore.closeNoticeDetail(targetIndex);
  };

  return (
    <Container>
      <DetailText>
        {notice.detail}
      </DetailText>
      <CloseButton
        type="closeButton"
        onClick={() => handleClickCloseNoticeDetail(index)}
      >
        닫기
      </CloseButton>
    </Container>
  );
}
