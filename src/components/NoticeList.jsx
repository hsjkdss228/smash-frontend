import styled from 'styled-components';

import Container from './ui/ComponentSectionContainer';
import SecondaryButton from './ui/SecondaryButton';

const PaddingWrapper = styled.div`
  padding-block: .75em;
`;

const Notice = styled.li`
  list-style: none;
`;

const NoticeTitle = styled.div`
  margin-top: ${({ selectedNoticeState }) => (
    selectedNoticeState ? '1em' : '0'
  )};
  margin-bottom: 1.5em;
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

const NoticeDetail = styled.div`
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

const ReadOrDeleteFunctions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function NoticeList({
  notices,
  noticeStateToShow,
  noticesDetailState,
  onClickShowNoticeDetail,
  onClickCloseNoticeDetail,
  selectNoticeState,
  noticesSelectedState,
  onClickSelectNotice,
  onClickSelectAllNotices,
  onClickDeselectAllNotices,
  onClickReadSelectedNotices,
  onClickDeleteSelectedNotices,
}) {
  if (noticeStateToShow === 'unread' && notices.length === 0) {
    return (
      <p>읽지 않은 알림이 없습니다.</p>
    );
  }

  return (
    <Container>
      <PaddingWrapper>
        {selectNoticeState && (
          <div>
            <SecondaryButton
              type="button"
              onClick={onClickSelectAllNotices}
            >
              전체선택
            </SecondaryButton>
            <SecondaryButton
              type="button"
              onClick={onClickDeselectAllNotices}
            >
              초기화
            </SecondaryButton>
          </div>
        )}
        {notices.map((notice, index) => (
          <Notice key={notice.id}>
            <NoticeTitle
              selectedNoticeState={selectNoticeState}
            >
              {selectNoticeState && (
                <Checkbox
                  type="checkbox"
                  id={notice.id}
                  checked={noticesSelectedState[index]}
                  onChange={() => onClickSelectNotice({
                    targetIndex: index,
                    targetId: notice.id,
                  })}
                />
              )}
              <NoticeTitleButton
                type="button"
                onClick={() => onClickShowNoticeDetail({
                  targetIndex: index,
                  targetId: notice.id,
                })}
              >
                {/* TODO: 시간 출력 내용은 백엔드에서 처리되어야 함 */}
                <CreatedAt>
                  {(
                    `${notice.createdAt.split('T')[0]} ${
                      notice.createdAt.split('T')[1].split('.')[0]
                    }`
                  )}
                </CreatedAt>
                <TitleText>{notice.title}</TitleText>
              </NoticeTitleButton>
              {noticesDetailState[index] && (
                <NoticeDetail>
                  <DetailText>{notice.detail}</DetailText>
                  <CloseButton
                    type="closeButton"
                    onClick={() => onClickCloseNoticeDetail(index)}
                  >
                    닫기
                  </CloseButton>
                </NoticeDetail>
              )}
            </NoticeTitle>
          </Notice>
        ))}
        {selectNoticeState && (
          <ReadOrDeleteFunctions>
            <SecondaryButton
              type="button"
              onClick={onClickReadSelectedNotices}
            >
              읽은 알림으로 처리
            </SecondaryButton>
            <SecondaryButton
              type="button"
              onClick={onClickDeleteSelectedNotices}
            >
              삭제
            </SecondaryButton>
          </ReadOrDeleteFunctions>
        )}
      </PaddingWrapper>
    </Container>
  );
}
