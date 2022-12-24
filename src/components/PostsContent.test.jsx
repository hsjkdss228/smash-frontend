import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostsContent from './PostsContent';

describe('PostsContent', () => {
  const onClickPost = jest.fn();

  function renderPostsContent({
    imageUrl,
    hits,
    isAuthor,
    type,
    date,
    place,
    currentMemberCount,
    targetMemberCount,
    registerStatus,
  }) {
    render((
      <PostsContent
        imageUrl={imageUrl}
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
  }

  context('게시물 목록 컴포넌트는', () => {
    const imageUrl = 'imageUrl';
    const hits = 100;
    const isAuthor = false;
    const type = '야구';
    const date = '2022년 10월 19일 08:00~11:00';
    const place = '잠실야구장';
    const currentMemberCount = 4;
    const targetMemberCount = 12;
    const registerStatus = 'accepted';

    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify(''));
    });

    it('각 게시물의 썸네일 출력', () => {
      renderPostsContent({
        imageUrl,
        hits,
        isAuthor,
        type,
        date,
        place,
        currentMemberCount,
        targetMemberCount,
        registerStatus,
      });

      screen.getByAltText('썸네일 이미지');
      expect(screen.getByAltText('썸네일 이미지').src).toContain('imageUrl');
      screen.getByText('100 조회');
      screen.getByText('야구');
      screen.getByText('2022년 10월 19일 08:00~11:00');
      screen.getByText('잠실야구장');
      screen.getByText('4/12명 참가 중');
    });

    context('로그인하지 않았을 경우', () => {
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify(''));
      });

      it('로그인 시 표출되는 상태를 출력하지 않음', () => {
        renderPostsContent({
          imageUrl,
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
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify('TOKEN'));
      });

      context('작성자인 경우', () => {
        it('내가 쓴 글이라는 메세지 출력', () => {
          renderPostsContent({
            imageUrl,
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
            imageUrl,
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
            imageUrl,
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

      context('어떤 상태도 아닌 경우', () => {
        it('참가 중이라는 메세지 출력', () => {
          renderPostsContent({
            imageUrl,
            hits,
            isAuthor: false,
            type,
            date,
            place,
            currentMemberCount,
            targetMemberCount,
            registerStatus: 'none',
          });

          expect(screen.queryByText('내가 쓴 글')).toBe(null);
          expect(screen.queryByText('참가 신청 중')).toBe(null);
          expect(screen.queryByText('참가 중')).toBe(null);
        });
      });
    });

    context('게시물 목록 내 내용 클릭 시', () => {
      it('해당 게시물 상세 정보 보기로 이동하는 핸들러 함수 호출', () => {
        renderPostsContent({
          imageUrl,
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
