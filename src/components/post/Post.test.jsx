import { render, screen, waitFor } from '@testing-library/react';
import context from 'jest-plugin-context';
import Post from './Post';

let post;
const fetchPost = jest.fn();
jest.mock('../hooks/usePostStore', () => () => ({
  post,
  fetchPost,
}));
let game;
let fetchGame;
jest.mock('../hooks/useGameStore', () => () => ({
  game,
  fetchGame,
}));
const fetchPlace = jest.fn();
jest.mock('../hooks/usePlaceStore', () => () => ({
  fetchPlace,
}));
let applicants;
const fetchMembers = jest.fn();
const fetchApplicants = jest.fn();
jest.mock('../hooks/useRegisterStore', () => () => ({
  applicants,
  fetchMembers,
  fetchApplicants,
}));

jest.mock('./PostGame', () => jest.fn());
jest.mock('./PostContent', () => jest.fn());
jest.mock('./PostPlace', () => jest.fn());
jest.mock('./PostGameMembers', () => jest.fn());

describe('Post', () => {
  const navigateBackward = jest.fn();
  const navigateLogin = jest.fn();
  const navigateSelectTrialAccount = jest.fn();
  const navigatePostsAfterDeleted = jest.fn();

  function renderPost({
    postId,
  }) {
    render((
      <Post
        postId={postId}
        navigateBackward={navigateBackward}
        navigateLogin={navigateLogin}
        navigateSelectTrialAccount={navigateSelectTrialAccount}
        naviagetPostsAfterDeleted={navigatePostsAfterDeleted}
      />
    ));
  }

  context('Post 컴포넌트가 마운트되면', () => {
    beforeEach(() => {
      post = {
        id: 1,
        isAuthor: true,
      };
      game = {
        id: 1,
        placeId: 2,
        currentMemberCount: 2,
        targetMemberCount: 4,
        registerStatus: 'accepted',
      };
      fetchGame = jest.fn(() => game.id);
    });
    const postId = 1;

    it('서버에서 게시글 상세 정보와 관련된 Data들을 fetch', async () => {
      renderPost({
        postId,
      });

      await waitFor(() => {
        expect(fetchPost).toBeCalledWith(postId);
        expect(fetchGame).toBeCalledWith(postId);
        expect(fetchPlace).toBeCalledWith(game.placeId);
        expect(fetchMembers).toBeCalledWith(game.id);
        expect(fetchApplicants).toBeCalledWith(game.id);
      });
    });

    context('접속자가 로그인했으면', () => {
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify('TOKEN'));
      });

      context('접속자가 작성자이면', () => {
        beforeEach(() => {
          post.isAuthor = true;
          applicants = [];
        });

        it('화면 최하단에 신청 관련 버튼/참가자 정원 안내/로그인 안내 메시지 대신'
          + '신청자 목록 화면을 출력', () => {
          renderPost({
            postId,
          });

          screen.getByText('신청자 정보');
        });
      });

      context('접속자가 참가 신청 중인 사용자이면', () => {
        beforeEach(() => {
          post.isAuthor = false;
          game.registerStatus = 'processing';
        });

        it('참가 신청 취소 버튼을 화면에 출력', () => {
          renderPost({
            postId,
          });

          screen.getByText('신청 취소하기');
        });
      });

      context('접속자가 참가 중인 사용자이면', () => {
        beforeEach(() => {
          post.isAuthor = false;
          game.registerStatus = 'accepted';
        });

        it('참가 취소 버튼을 화면에 출력', () => {
          renderPost({
            postId,
          });

          screen.getByText('참가 취소하기');
        });
      });

      context('접속자가 참가 신청/참가 중인 참여자가 아니라면', () => {
        beforeEach(() => {
          post.isAuthor = false;
          game.registerStatus = 'none';
        });

        context('조회하는 게시글의 운동 참가 정원이 가득 찼으면', () => {
          beforeEach(() => {
            game.currentMemberCount = 4;
            game.targetMemberCount = 4;
          });

          it('신청 관련 버튼 대신 참가 정원이 모두 찼다는 메시지 출력', () => {
            renderPost({
              postId,
            });

            screen.getByText('참가 정원이 모두 찼습니다.');
          });
        });

        context('조회하는 게시글의 운동 참가 정원에 여석이 있으면', () => {
          beforeEach(() => {
            game.currentMemberCount = 2;
            game.targetMemberCount = 4;
          });

          it('참가 신청 버튼을 화면에 출력', () => {
            renderPost({
              postId,
            });

            screen.getByText('참가 신청하기');
          });
        });
      });
    });

    context('접속자가 로그인하지 않았으면', () => {
      beforeEach(() => {
        localStorage.setItem('accessToken', JSON.stringify(''));
        post.isAuthor = false;
        game.registerStatus = 'none';
      });

      context('조회하는 게시글의 운동 참가 정원이 가득 찼으면', () => {
        beforeEach(() => {
          game.currentMemberCount = 4;
          game.targetMemberCount = 4;
        });

        it('참가 신청 버튼 대신 참가 정원이 모두 찼다는 메시지 출력', () => {
          renderPost({
            postId,
          });

          screen.getByText('참가 정원이 모두 찼습니다.');
        });
      });

      context('조회하는 게시글의 운동 참가 정원에 여석이 있으면', () => {
        beforeEach(() => {
          game.currentMemberCount = 2;
          game.targetMemberCount = 4;
        });

        it('로그인 안내 메시지 및 로그인, 체험 계정 안내 화면 이동 버튼을 화면에 출력', () => {
          renderPost({
            postId,
          });

          screen.getByText('참가를 신청하려면 로그인이 필요합니다.');
          screen.getByText('로그인하기');
          screen.getByText('체험 계정 선택하기');
        });
      });
    });
  });
});
