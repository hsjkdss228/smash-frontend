import styled from 'styled-components';

import useNoticeStore from '../../hooks/useNoticeStore';
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

const CreatedAtAndStatus = styled.div`
  display: flex;
  align-items: center;
`;

const CreatedAt = styled.p`
  font-weight: bold;
  text-align: left;
  margin-right: 2em;
  margin-bottom: .2em;
`;

const Status = styled.p`
  font-size: .8em;
`;

const TitleText = styled.p`
  font-size: .9em;
  text-align: left;
`;

export default function NoticeTitle({
  notice,
  index,
  selectNoticeMode,
  isSelected,
  isDetailOpened,
}) {
  const noticeStore = useNoticeStore();

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
          checked={isSelected}
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
        <CreatedAtAndStatus>
          <CreatedAt>
            {(`${notice.createdAt.split('T')[0]} ${
              notice.createdAt.split('T')[1].split('.')[0]
            }`)}
          </CreatedAt>
          <Status
            className={notice.status === 'unread'
              ? 'notice-status-unread'
              : 'notice-status-read'}
          >
            {notice.status === 'unread'
              ? '읽지 않음'
              : '읽음'}
          </Status>
        </CreatedAtAndStatus>
        <TitleText>
          {notice.title}
        </TitleText>
      </NoticeTitleButton>
      {isDetailOpened && (
        <NoticeDetail
          notice={notice}
          index={index}
        />
      )}
    </Container>
  );
}
