import styled from 'styled-components';

import useNoticeStore from '../hooks/useNoticeStore';
import NoticeDetail from './NoticeDetail';

const Container = styled.div`
  margin-bottom: ${({ isSelectNoticeMode }) => (
    isSelectNoticeMode ? '1.5em' : '1em'
  )};
  display: flex;
`;

const Checkbox = styled.input`
  margin-right: 1.5em;
`;

const NoticeTitleButton = styled.button`
  display: flex;
  flex-direction: column;
`;

const CreatedAt = styled.p`
  font-weight: bold;
  text-align: left;
  margin-bottom: .2em;
`;

const TitleText = styled.p`
  font-size: .9em;
  text-align: left;
`;

export default function NoticeTitle({
  notice,
  index,
}) {
  const noticeStore = useNoticeStore();

  const {
    selectNoticeMode,
    selectedNotices,
    isOpenedNotice,
  } = noticeStore;

  const handleSelectNotice = ({
    targetIndex,
    targetId,
  }) => {
    noticeStore.selectNotice({ targetIndex, targetId });
  };

  const handleClickNoticeTitle = async ({
    targetIndex,
    targetId,
  }) => {
    await noticeStore.showNoticeDetail(targetIndex);
    await noticeStore.readNotice(targetId);
  };

  return (
    <Container
      isSelectNoticeMode={selectNoticeMode}
    >
      {selectNoticeMode && (
        <Checkbox
          type="checkbox"
          id={notice.id}
          checked={selectedNotices[index]}
          onChange={() => handleSelectNotice({
            targetIndex: index,
            targetId: notice.id,
          })}
        />
      )}
      <NoticeTitleButton
        type="button"
        onClick={() => handleClickNoticeTitle({
          targetIndex: index,
          targetId: notice.id,
        })}
      >
        {/* TODO: 시간 출력 내용은 백엔드에서 처리되어야 함 */}
        <CreatedAt>
          {(`${notice.createdAt.split('T')[0]} ${
            notice.createdAt.split('T')[1].split('.')[0]
          }`)}
        </CreatedAt>
        <TitleText>
          {notice.title}
        </TitleText>
      </NoticeTitleButton>
      {isOpenedNotice[index] && (
        <NoticeDetail
          notice={notice}
          index={index}
        />
      )}
    </Container>
  );
}
