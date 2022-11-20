import {
  fireEvent, render, screen,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import PostPage from './PostPage';

let postId;
const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: {
      postId,
    },
  }),
  useNavigate: () => (
    navigate
  ),
}));

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

let members;
let applicants;
const fetchMembers = jest.fn();
const fetchApplicants = jest.fn();
let registerToGame;
const cancelRegisterToGame = jest.fn();
const cancelParticipateToGame = jest.fn();
const acceptRegister = jest.fn();
const rejectRegister = jest.fn();
jest.mock('../hooks/useRegisterStore', () => () => ({
  members,
  applicants,
  fetchMembers,
  fetchApplicants,
  registerToGame,
  cancelRegisterToGame,
  cancelParticipateToGame,
  acceptRegister,
  rejectRegister,
}));

describe('PostPage', () => {
  function renderPostPage() {
    render((
      <PostPage />
    ));
  }

  context('게시글 작성자가 아닌 경우', () => {
    context('운동 모집 게시글 상세 정보 페이지에 접속하면', () => {
      beforeEach(() => {
        postId = 1;

        post = {
          id: 1,
          hits: 15,
          authorName: '작성자',
          authorPhoneNumber: '010-6877-2291',
          detail: '게시글 상세 정보 내용입니다.',
          isAuthor: false,
        };
        game = {
          id: 1,
          type: '농구',
          date: '2022년 12월 23일 20:00~22:00',
          place: '인천삼산체육관',
          currentMemberCount: 2,
          targetMemberCount: 12,
          registerId: -1,
          registerStatus: 'none',
        };
        members = [
          {
            id: 1,
            name: '작성자',
            gender: '남성',
            phoneNumber: '010-6877-2291',
          },
        ];
      });

      it('운동 모집 게시글 상세 정보 상태들을 PostStore, '
        + 'GameStore, MemberStore에서 순차적으로 fetch', async () => {
        jest.clearAllMocks();
        const expectedPostId = 1;
        const expectedGameId = 1;
        fetchGame = jest.fn(() => expectedGameId);

        renderPostPage();

        await expect(fetchPost).toBeCalledWith(expectedPostId);
        await expect(fetchGame).toBeCalledWith(expectedPostId);
        await expect(fetchMembers).toBeCalledWith(expectedGameId);
        await expect(fetchApplicants).not.toBeCalled();
      });
    });

    context('게시글에 참가 신청 버튼이 출력되는 상태에서 사용자가 참가 신청 버튼을 누르면', () => {
      beforeEach(() => {
        postId = 1;

        post = {
          id: 1,
          hits: 15,
          authorName: '작성자',
          authorPhoneNumber: '010-6877-2291',
          detail: '게시글 상세 정보 내용입니다.',
          isAuthor: false,
        };
        game = {
          id: 1,
          type: '야구',
          date: '2022년 09월 30일 14:00~17:00',
          place: '한화생명이글스파크',
          currentMemberCount: 1,
          targetMemberCount: 6,
          registerId: -1,
          registerStatus: 'none',
        };
        members = [
          {
            id: 1,
            name: '작성자',
            gender: '남성',
            phoneNumber: '010-6877-2291',
          },
        ];
      });

      it('해당 게임에 참가를 신청하는 운동 참가 신청 함수 호출 후, '
        + '신청 번호를 성공적으로 반환했을 경우 게시글 상세 정보를 순차적으로 fetch', async () => {
        jest.clearAllMocks();
        const expectedPostId = 1;
        const expectedGameId = 1;
        const expectedApplicationId = 2;
        registerToGame = jest.fn(() => expectedApplicationId);
        fetchGame = jest.fn(() => expectedGameId);

        renderPostPage();

        fireEvent.click(screen.getByText('신청'));
        await expect(registerToGame).toBeCalledWith(expectedGameId);
        await expect(fetchPost).nthCalledWith(2, expectedPostId);
        await expect(fetchGame).nthCalledWith(2, expectedPostId);
        await expect(fetchMembers).nthCalledWith(2, expectedGameId);
        await expect(fetchApplicants).not.toBeCalled();
      });
    });

    context('게시글에 참가 신청 취소 버튼이 출력되는 상태에서 사용자가 참가 신청 취소 버튼을 누르면', () => {
      beforeEach(() => {
        postId = 1;

        post = {
          id: 1,
          hits: 15,
          authorName: '작성자',
          authorPhoneNumber: '010-6877-2291',
          detail: '게시글 상세 정보 내용입니다.',
          isAuthor: false,
        };
        game = {
          id: 2,
          type: '수영',
          date: '2022년 12월 26일 07:00~09:00',
          place: '박태환수영장',
          currentMemberCount: 2,
          targetMemberCount: 6,
          registerId: 17,
          registerStatus: 'processing',
        };
        members = [
          {
            id: 1,
            name: '작성자',
            gender: '남성',
            phoneNumber: '010-6877-2291',
          },
          {
            id: 17,
            name: '수영 좋아하는 사람',
            gender: '남성',
            phoneNumber: '010-5555-5555',
          },
        ];
      });

      it('해당 신청의 상태를 변경하는 운동 참가 신청 취소 함수 호출 후, '
      + '게시글 상세 정보를 순차적으로 fetch', async () => {
        jest.clearAllMocks();
        const expectedPostId = 1;
        const expectedGameId = 2;
        const expectedRegisterId = 17;
        fetchGame = jest.fn(() => expectedGameId);

        renderPostPage();

        fireEvent.click(screen.getByText('신청취소'));
        await expect(cancelRegisterToGame).toBeCalledWith(expectedRegisterId);
        await expect(fetchPost).nthCalledWith(2, expectedPostId);
        await expect(fetchGame).nthCalledWith(2, expectedPostId);
        await expect(fetchMembers).nthCalledWith(2, expectedGameId);
        await expect(fetchApplicants).not.toBeCalled();
      });
    });

    context('게시글에 참가 취소 버튼이 출력되는 상태에서 사용자가 참가 취소 버튼을 누르면', () => {
      beforeEach(() => {
        postId = 1;

        post = {
          id: 1,
          hits: 15,
          authorName: '작성자',
          authorPhoneNumber: '010-6877-2291',
          detail: '게시글 상세 정보 내용입니다.',
          isAuthor: false,
        };
        game = {
          id: 2,
          type: '양궁',
          date: '2022년 1월 30일 17:00~19:00',
          place: '진천국가대표선수촌훈련장 양궁장',
          currentMemberCount: 2,
          targetMemberCount: 2,
          registerId: 20,
          registerStatus: 'accepted',
        };
        members = [
          {
            id: 1,
            name: '작성자',
            gender: '남성',
            phoneNumber: '010-6877-2291',
          },
          {
            id: 20,
            name: '안산',
            gender: '여성',
            phoneNumber: '010-8765-4321',
          },
        ];
      });

      it('해당 신청의 상태를 변경하는 운동 참가 취소 함수 호출 후, '
      + '게시글 상세 정보를 순차적으로 fetch', async () => {
        jest.clearAllMocks();
        const expectedPostId = 1;
        const expectedGameId = 2;
        const expectedRegisterId = 20;
        fetchGame = jest.fn(() => expectedGameId);

        renderPostPage();

        fireEvent.click(screen.getByText('참가취소'));
        await expect(cancelParticipateToGame).toBeCalledWith(expectedRegisterId);
        await expect(fetchPost).nthCalledWith(2, expectedPostId);
        await expect(fetchGame).nthCalledWith(2, expectedPostId);
        await expect(fetchMembers).nthCalledWith(2, expectedGameId);
        await expect(fetchApplicants).not.toBeCalled();
      });
    });
  });

  context('게시글 작성자인 경우', () => {
    beforeEach(() => {
      postId = 1;

      post = {
        id: 1,
        hits: 15,
        authorName: '작성자',
        authorPhoneNumber: '010-6877-2291',
        detail: '게시글 상세 정보 내용입니다.',
        isAuthor: true,
      };
      game = {
        id: 2,
        type: '육상',
        date: '2022년 5월 14일 20:00~21:00',
        place: '잠실종합운동장',
        currentMemberCount: 1,
        targetMemberCount: 5,
        registerId: 4,
        registerStatus: 'accepted',
      };
      members = [
        {
          id: 1,
          name: '작성자',
          gender: '남성',
          phoneNumber: '010-6877-2291',
        },
      ];
      applicants = [
        {
          id: 3,
          name: '이봉주',
          gender: '남성',
          phoneNumber: '010-2424-2424',
        },
      ];
    });

    it('운동 모집 게시글 상세 정보 및 신청자 정보 상태들을 PostStore, '
    + 'GameStore, MemberStore에서 순차적으로 fetch', async () => {
      jest.clearAllMocks();
      const expectedPostId = 1;
      const expectedGameId = 2;
      fetchGame = jest.fn(() => expectedGameId);

      renderPostPage();

      await expect(fetchPost).toBeCalledWith(expectedPostId);
      await expect(fetchGame).toBeCalledWith(expectedPostId);
      await expect(fetchMembers).toBeCalledWith(expectedGameId);
      await expect(fetchApplicants).toBeCalledWith(expectedGameId);
    });

    context('신청자에 대해 수락 버튼을 눌렀을 경우', () => {
      it('참가 신청 수락 함수 호출 후, 게시글 상세 정보를 순차적으로 fetch', async () => {
        jest.clearAllMocks();
        const expectedPostId = 1;
        const expectedGameId = 2;
        const expectedRegisterId = 3;
        fetchGame = jest.fn(() => expectedGameId);

        renderPostPage();

        fireEvent.click(screen.getByText('수락'));
        await expect(acceptRegister).toBeCalledWith(expectedRegisterId);
        await expect(fetchPost).nthCalledWith(2, expectedPostId);
        await expect(fetchGame).nthCalledWith(2, expectedPostId);
        await expect(fetchMembers).nthCalledWith(2, expectedGameId);
        await expect(fetchApplicants).nthCalledWith(2, expectedGameId);
      });
    });

    context('신청자에 대해 거절 버튼을 눌렀을 경우', () => {
      it('참가 신청 거절 함수 호출 후, 게시글 상세 정보를 순차적으로 fetch', async () => {
        jest.clearAllMocks();
        const expectedPostId = 1;
        const expectedGameId = 2;
        const expectedRegisterId = 3;
        fetchGame = jest.fn(() => expectedGameId);

        renderPostPage();

        fireEvent.click(screen.getByText('거절'));
        await expect(rejectRegister).toBeCalledWith(expectedRegisterId);
        await expect(fetchPost).nthCalledWith(2, expectedPostId);
        await expect(fetchGame).nthCalledWith(2, expectedPostId);
        await expect(fetchMembers).nthCalledWith(2, expectedGameId);
        await expect(fetchApplicants).nthCalledWith(2, expectedGameId);
      });
    });
  });
});
