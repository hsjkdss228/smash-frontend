import styled from 'styled-components';

const Container = styled.ul`
  
`;

const Notice = styled.li`
  
`;

const NoticeTitle = styled.div`
  font-size: .75em;
  display: flex;
  gap: .5em;
`;

const NoticeDetail = styled.div`
  
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
      {selectNoticeState && (
        <div>
          <button
            type="button"
            onClick={onClickSelectAllNotices}
          >
            전체선택
          </button>
          <button
            type="button"
            onClick={onClickDeselectAllNotices}
          >
            초기화
          </button>
        </div>
      )}
      {notices.map((notice, index) => (
        <Notice key={notice.id}>
          <NoticeTitle>
            {selectNoticeState && (
              <input
                type="checkbox"
                id={notice.id}
                checked={noticesSelectedState[index]}
                onChange={() => onClickSelectNotice({
                  targetIndex: index,
                  targetId: notice.id,
                })}
              />
            )}
            <button
              type="button"
              onClick={() => onClickShowNoticeDetail({
                targetIndex: index,
                targetId: notice.id,
              })}
            >
              <p>
                id:
                {' '}
                {notice.id}
              </p>
              <p>{notice.status}</p>
              <p>{notice.createdAt}</p>
              <p>{notice.title}</p>
            </button>
          </NoticeTitle>
          {noticesDetailState[index] && (
            <NoticeDetail>
              <button
                type="button"
                onClick={() => onClickCloseNoticeDetail(index)}
              >
                닫기
              </button>
              <p>{notice.detail}</p>
            </NoticeDetail>
          )}
        </Notice>
      ))}
      {selectNoticeState && (
        <div>
          <p>선택한 알림을</p>
          <div>
            <button
              type="button"
              onClick={onClickReadSelectedNotices}
            >
              읽은 알림으로 처리
            </button>
            <button
              type="button"
              onClick={onClickDeleteSelectedNotices}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
