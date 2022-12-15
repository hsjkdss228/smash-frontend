/* eslint-disable no-nested-ternary */

import { useEffect } from 'react';
import styled from 'styled-components';
import useNoticeStore from '../hooks/useNoticeStore';
import NoticeFunctionsForSelected from './NoticeFunctionsForSelected';
import NoticeSelectMethodButtons from './NoticeSelectMethodButtons';
import NoticeTitle from './NoticeTitle';

import ComponentSectionContainer from './ui/ComponentSectionContainer';

const PaddingWrapper = styled.div`
  padding-block: .75em;
`;

const NoNotices = styled.p`
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  margin-block: .5em 5em;
`;

const Notice = styled.li`
  list-style: none;
`;

export default function NoticeList() {
  const noticeStore = useNoticeStore();

  useEffect(() => {
    noticeStore.closeSelectNoticeMode();
    noticeStore.fetchNotices();
  }, []);

  const {
    noticesAll,
    noticesUnread,
    noticeStateToShown,
    selectNoticeMode,
  } = noticeStore;

  const notices = noticeStateToShown === 'all'
    ? noticesAll
    : noticesUnread;

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
      {noticeStateToShown === 'all' && (!notices || notices.length === 0) ? (
        <NoNotices>조회 가능한 알림이 없습니다.</NoNotices>
      ) : noticeStateToShown === 'unread' && notices.length === 0 ? (
        <NoNotices>읽지 않은 알림이 없습니다.</NoNotices>
      ) : (
        <PaddingWrapper>
          {selectNoticeMode && (
            <NoticeSelectMethodButtons />
          )}
          {notices.map((notice, index) => (
            <Notice key={notice.id}>
              <NoticeTitle
                notice={notice}
                index={index}
              />
            </Notice>
          ))}
          {selectNoticeMode && (
            <NoticeFunctionsForSelected />
          )}
        </PaddingWrapper>
      )}
    </ComponentSectionContainer>
  );
}
