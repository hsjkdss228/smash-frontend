import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Posts from './Posts';

describe('Posts', () => {
  const navigateToPost = jest.fn();
  const toggleSearchSetting = jest.fn();
  const toggleFilterSetting = jest.fn();

  const renderPosts = ({
    loggedIn,
    searchSetting,
    filterSetting,
    posts,
    postsErrorMessage,
  }) => {
    render((
      <Posts
        loggedIn={loggedIn}
        searchSetting={searchSetting}
        filterSetting={filterSetting}
        toggleSearchSetting={toggleSearchSetting}
        toggleFilterSetting={toggleFilterSetting}
        posts={posts}
        navigateToPost={navigateToPost}
        postsErrorMessage={postsErrorMessage}
      />
    ));
  };

  context('등록된 게시글이 존재하지 않는 경우', () => {
    const loggedIn = false;
    const searchSetting = false;
    const filterSetting = false;
    const posts = [];
    const postsErrorMessage = '';

    it('게시물 미존재 안내 메세지 출력', () => {
      renderPosts({
        loggedIn,
        searchSetting,
        filterSetting,
        posts,
        postsErrorMessage,
      });

      screen.getByText(/등록된 게시물이 존재하지 않습니다./);
    });
  });

  context('게임이 찾아지지 않은 에러가 발생한 경우', () => {
    const loggedIn = false;
    const searchSetting = false;
    const filterSetting = false;
    const posts = [
      {
        id: 1,
        hits: 334,
        isAuthor: false,
        game: {},
      },
    ];
    const postsErrorMessage = '주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다.';

    it('에러 메세지 출력', () => {
      renderPosts({
        loggedIn,
        searchSetting,
        filterSetting,
        posts,
        postsErrorMessage,
      });

      screen.getByText(/주어진 게임 번호에 해당하는 게임을 찾을 수 없습니다./);
    });
  });

  context('등록된 게시물이 있을 경우', () => {
    const loggedIn = false;
    const searchSetting = false;
    const filterSetting = false;
    const posts = [
      {
        id: 1,
        hits: 334,
        isAuthor: false,
        game: {
          id: 2,
          type: '배드민턴',
          date: '2022년 10월 24일 13:00~16:00',
          place: '올림픽공원 핸드볼경기장',
          currentMemberCount: 4,
          targetMemberCount: 5,
          registerId: -1,
          registerStatus: 'none',
        },
      },
    ];
    const postsErrorMessage = '';

    it('게시물 내용 클릭 시 해당 게시물 상세 정보 보기로 이동하는 navigate 함수 호출', () => {
      renderPosts({
        loggedIn,
        searchSetting,
        filterSetting,
        posts,
        postsErrorMessage,
      });

      fireEvent.click(screen.getByText('배드민턴'));
      const expectedPostId = 1;
      expect(navigateToPost).toBeCalledWith(expectedPostId);
    });
  });

  context('검색조건 또는 조회방식 설정 버튼을 클릭하는 경우', () => {
    const loggedIn = false;
    const searchSetting = false;
    const filterSetting = false;
    const posts = [];
    const postsErrorMessage = '';

    it('각 설정 버튼 출력 상태를 toggle하는 함수 호출', () => {
      renderPosts({
        loggedIn,
        searchSetting,
        filterSetting,
        posts,
        postsErrorMessage,
      });

      fireEvent.click(screen.getByText('검색조건 설정'));
      expect(toggleSearchSetting).toBeCalled();
      fireEvent.click(screen.getByText('조회방식 설정'));
      expect(toggleFilterSetting).toBeCalled();
    });
  });
});
