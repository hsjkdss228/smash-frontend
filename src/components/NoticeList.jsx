/* eslint-disable no-nested-ternary */

import { useEffect } from 'react';
import styled from 'styled-components';

import useNoticeStore from '../hooks/useNoticeStore';

import ComponentSectionContainer from './ui/ComponentSectionContainer';

import NoticeFunctionsForSelected from './NoticeFunctionsForSelected';
import NoticeSelectMethodButtons from './NoticeSelectMethodButtons';
import NoticeTitle from './NoticeTitle';

const PaddingWrapper = styled.div`
  padding-block: .75em;
`;

const EmptyNotices = styled.p`
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
    noticeStateToShow,
    selectNoticeMode,
    selectedNotices,
    isOpenedNotice,
  } = noticeStore;

  const notices = noticeStateToShow === 'all'
    ? noticesAll
    : noticesUnread;

  return (
    <ComponentSectionContainer
      backgroundColor="#FFF"
    >
      {noticeStateToShow === 'all' && (!notices || notices.length === 0) ? (
        <EmptyNotices>조회 가능한 알림이 없습니다.</EmptyNotices>
      ) : noticeStateToShow === 'unread' && notices.length === 0 ? (
        <EmptyNotices>읽지 않은 알림이 없습니다.</EmptyNotices>
      ) : (
        <PaddingWrapper>
          {selectNoticeMode && (
            <NoticeSelectMethodButtons />
          )}
          {notices.map((notice, index) => (
            <Notice key={notice.id}>
              <NoticeTitle
                id="notice"
                notice={notice}
                index={index}
                selectNoticeMode={selectNoticeMode}
                isSelected={selectedNotices[index]}
                isDetailOpened={isOpenedNotice[index]}
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
