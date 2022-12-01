import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostsContent from './PostsContent';

describe('PostsContent', () => {
  const onClickPost = jest.fn();

  const renderPostsContent = ({
    loggedIn,
    hits,
    isAuthor,
    type,
    date,
    place,
    currentMemberCount,
    targetMemberCount,
    registerStatus,
  }) => {
    render((
      <PostsContent
        loggedIn={loggedIn}
        hits={hits}
        isAuthor={isAuthor}
        type={type}
        date={date}
        place={place}
        currentMemberCount={currentMemberCount}
        targetMemberCount={targetMemberCount}
        registerStatus={registerStatus}
        onClickPost={onClickPost}
      />
    ));
  };

  context('등록된 게시글이 존재하는 경우', () => {
    const loggedIn = true;
    const hits = 100;
    const isAuthor = false;
    const type = '야구';
    const date = '2022년 10월 19일 08:00~11:00';
    const place = '잠실야구장';
    const currentMemberCount = 4;
    const targetMemberCount = 12;
    const registerStatus = 'accepted';

    it('각 게시물의 썸네일 출력', () => {
      renderPostsContent({
        loggedIn,
        hits,
        isAuthor,
        type,
        date,
        place,
        currentMemberCount,
        targetMemberCount,
        registerStatus,
      });

      screen.getByText('100 hits');
      screen.getByText('야구');
      screen.getByText(/2022년 10월 19일 08:00~11:00/);
      screen.getByText(/잠실야구장/);
      screen.getByText(/4/);
      screen.getByText(/12/);
    });

    context('로그인하지 않았을 경우', () => {
      it('로그인 시 표출되는 상태를 출력하지 않음', () => {
        renderPostsContent({
          loggedIn: false,
          hits,
          isAuthor,
          type,
          date,
          place,
          currentMemberCount,
          targetMemberCount,
          registerStatus,
        });

        expect(screen.queryByText('내가 쓴 글')).toBe(null);
        expect(screen.queryByText('참가 신청 중')).toBe(null);
        expect(screen.queryByText('참가 중')).toBe(null);
      });
    });

    context('로그인했을 경우', () => {
      context('작성자인 경우', () => {
        it('내가 쓴 글이라는 메세지 출력', () => {
          renderPostsContent({
            loggedIn,
            hits,
            isAuthor: true,
            type,
            date,
            place,
            currentMemberCount,
            targetMemberCount,
            registerStatus,
          });

          screen.getByText('내가 쓴 글');
        });
      });

      context('참가 신청 중인 사용자인 경우', () => {
        it('참가 신청 중이라는 메세지 출력', () => {
          renderPostsContent({
            loggedIn,
            hits,
            isAuthor: false,
            type,
            date,
            place,
            currentMemberCount,
            targetMemberCount,
            registerStatus: 'processing',
          });

          screen.getByText('참가 신청 중');
        });
      });

      context('참가 중인 사용자인 경우', () => {
        it('참가 중이라는 메세지 출력', () => {
          renderPostsContent({
            loggedIn,
            hits,
            isAuthor: false,
            type,
            date,
            place,
            currentMemberCount,
            targetMemberCount,
            registerStatus: 'accepted',
          });

          screen.getByText('참가 중');
        });
      });
    });

    context('게시물 내용 클릭 시', () => {
      it('해당 게시물 상세 정보 보기로 이동하는 핸들러 함수 호출', () => {
        renderPostsContent({
          loggedIn,
          hits,
          isAuthor,
          type,
          date,
          place,
          currentMemberCount,
          targetMemberCount,
          registerStatus,
        });

        fireEvent.click(screen.getByText('야구'));
        expect(onClickPost).toBeCalled();
      });
    });
  });
});
