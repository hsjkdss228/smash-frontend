import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import Post from './Post';

describe('Post', () => {
  const navigateToBackward = jest.fn();
  const handleClickDeletePost = jest.fn();
  const handleClickRegister = jest.fn();
  const handleClickRegisterCancel = jest.fn();
  const handleClickParticipateCancel = jest.fn();
  const acceptRegister = jest.fn();
  const rejectRegister = jest.fn();

  const renderPost = ({
    post,
    game,
    members,
    applicants,
    registerError,
  }) => {
    render((
      <Post
        navigateToBackward={navigateToBackward}
        post={post}
        game={game}
        members={members}
        applicants={applicants}
        handleClickDeletePost={handleClickDeletePost}
        handleClickRegister={handleClickRegister}
        handleClickRegisterCancel={handleClickRegisterCancel}
        handleClickParticipateCancel={handleClickParticipateCancel}
        acceptRegister={acceptRegister}
        rejectRegister={rejectRegister}
        registerError={registerError}
      />
    ));
  };

  context('게시글 정보가 아직 전달되지 않은 경우', () => {
    const post = {};
    const game = {};
    const members = [];
    const applicants = [];
    const registerError = {};

    it('게시글 정보를 불러오고 있다는 메세지 출력', () => {
      renderPost({
        post,
        game,
        members,
        applicants,
        registerError,
      });

      screen.getByText('정보를 불러오고 있습니다...');
    });
  });

  // TODO: 작성자인 경우, 참가자인 경우에 따라
  //   출력되는 컴포넌트의 차이를 테스트해야 함

  context('게시글 정보가 출력될 때 뒤로가기 버튼을 누르면', () => {
    const post = {
      id: 1,
      hits: 223,
      authorName: '작성자',
      authorPhoneNumber: '010-1111-2222',
      detail: '점심먹고 가볍게 탁구하실분?',
      isAuthor: false,
    };
    const game = {
      id: 1,
      type: '탁구',
      date: '2022년 10월 19일 12:30~13:30',
      place: '서울숲탁구클럽',
      currentMemberCount: 1,
      targetMemberCount: 4,
      registerId: -1,
      registerStatus: 'none',
    };
    const members = [
      {
        id: 1,
        name: '작성자',
        gender: '남성',
        phoneNumber: '010-1111-2222',
      },
    ];
    const applicants = [];
    const registerError = {};

    it('뒤로가기 navigate 함수를 호출하는 핸들러 함수 호출', () => {
      renderPost({
        post,
        game,
        members,
        applicants,
        registerError,
      });

      fireEvent.click(screen.getByText('⬅️'));
      expect(navigateToBackward).toBeCalled();
    });
  });

  context('게시글에 참가 신청 버튼이 출력되는 상태에서'
    + '사용자가 게시글의 게임에 참가 신청 버튼을 누르면', () => {
    const post = {
      id: 1,
      hits: 223,
      authorName: '작성자',
      authorPhoneNumber: '010-1111-2222',
      detail: '가을 북한산 단풍 구경 모임입니다.',
      isAuthor: false,
    };
    const game = {
      id: 11,
      type: '등산',
      date: '2022년 10월 20일 07:00~14:00',
      place: '북한산우이역',
      currentMemberCount: 1,
      targetMemberCount: 4,
      registerId: -1,
      registerStatus: 'none',
    };
    const members = [
      {
        id: 1,
        name: '작성자',
        gender: '남성',
        phoneNumber: '010-1111-2222',
      },
    ];
    const applicants = [];
    const registerError = {};

    it('해당 게임에 참가를 신청하는 운동 참가 신청 핸들러 함수 호출', () => {
      renderPost({
        post,
        game,
        members,
        applicants,
        registerError,
      });

      fireEvent.click(screen.getByText('신청'));
      expect(handleClickRegister).toBeCalledWith(11);
    });
  });

  context('게시글에 참가 신청 취소 버튼이 출력되는 상태에서'
    + '사용자가 게시글의 게임에 참가 신청 취소 버튼을 누르면', () => {
    const post = {
      id: 1,
      hits: 223,
      authorName: '작성자',
      authorPhoneNumber: '010-9999-9999',
      detail: '아라서해갑문 인증센터 >> 여주보 인증센터 당일치기 라이딩입니다.',
      isAuthor: false,
    };
    const game = {
      id: 11,
      type: '자전거',
      date: '2022년 10월 26일 08:00~15:00',
      place: '아라서해갑문 인증센터',
      currentMemberCount: 2,
      targetMemberCount: 4,
      registerId: 5,
      registerStatus: 'processing',
    };
    const members = [
      {
        id: 1,
        name: '작성자',
        gender: '남성',
        phoneNumber: '010-9999-9999',
      },
      {
        id: 5,
        name: '자전거 하루에 200km타는 사람',
        gender: '남성',
        phoneNumber: '010-6666-6666',
      },
    ];
    const applicants = [];
    const registerError = {};

    it('해당 게임 참가 신청을 취소하는 운동 참가 신청 취소 핸들러 함수 호출', () => {
      renderPost({
        post,
        game,
        members,
        applicants,
        registerError,
      });

      fireEvent.click(screen.getByText('신청취소'));
      expect(handleClickRegisterCancel).toBeCalledWith(5);
    });
  });

  context('게시글에 참가 취소 버튼이 출력되는 상태에서'
    + '사용자가 게시글의 게임에 참가 취소 버튼을 누르면', () => {
    const post = {
      id: 1,
      hits: 223,
      authorName: '작성자',
      authorPhoneNumber: '010-9999-9999',
      detail: '예시 쓰는것도 쉽지 않네요',
      isAuthor: false,
    };
    const game = {
      id: 11,
      type: '예시 운동',
      date: '2022년 99월 99일 99:00~99:99',
      place: '예시 장소',
      currentMemberCount: 2,
      targetMemberCount: 2000,
      registerId: 10,
      registerStatus: 'accepted',
    };
    const members = [
      {
        id: 1,
        name: '작성자',
        gender: '여성',
        phoneNumber: '010-9999-9999',
      },
      {
        id: 10,
        name: '참가하는 사람 이름',
        gender: '여성',
        phoneNumber: '010-1234-5678',
      },
    ];
    const applicants = [];
    const registerError = {};

    it('해당 게임 참가 신청을 취소하는 운동 참가 신청 취소 핸들러 함수 호출', () => {
      renderPost({
        post,
        game,
        members,
        applicants,
        registerError,
      });

      fireEvent.click(screen.getByText('참가취소'));
      expect(handleClickParticipateCancel).toBeCalledWith(10);
    });
  });

  // TODO: 게시글 수정하기 기능 추가 시 아래의 테스트들에 추가되어야 함
  context('작성자가 아닌 사용자는', () => {
    const post = {
      id: 1,
      hits: 2,
      authorName: '작성자',
      authorPhoneNumber: '010-1111-2222',
      detail: '게시글 내용',
      isAuthor: false,
    };
    const game = {
      id: 1,
      type: '탁구',
      date: '2022년 10월 19일 12:30~13:30',
      place: '서울숲탁구클럽',
      currentMemberCount: 1,
      targetMemberCount: 4,
      registerId: -1,
      registerStatus: 'none',
    };
    const members = [
      {
        id: 1,
        name: '작성자',
        gender: '남성',
        phoneNumber: '010-1111-2222',
      },
    ];
    const applicants = [];
    const registerError = {};

    it('게시글 삭제하기 버튼을 확인할 수 없음', () => {
      renderPost({
        post,
        game,
        members,
        applicants,
        registerError,
      });

      expect(screen.queryByText('삭제하기')).toBe(null);
    });
  });

  context('작성자는', () => {
    const post = {
      id: 1,
      hits: 2,
      authorName: '작성자',
      authorPhoneNumber: '010-1111-2222',
      detail: '게시글 내용',
      isAuthor: true,
    };
    const game = {
      id: 1,
      type: '사격',
      date: '2022년 10월 19일 12:30~13:30',
      place: '금곡과학화예비군훈련장',
      currentMemberCount: 1,
      targetMemberCount: 4,
      registerId: 10,
      registerStatus: 'accepted',
    };
    const members = [
      {
        id: 1,
        name: '작성자',
        gender: '남성',
        phoneNumber: '010-1111-2222',
      },
    ];
    const applicants = [];
    const registerError = {};

    it('게시글 삭제하기 버튼을 확인할 수 있음', () => {
      renderPost({
        post,
        game,
        members,
        applicants,
        registerError,
      });

      screen.getByText('삭제하기');
    });

    context('삭제하기 버튼을 누를 경우', () => {
      it('게시글 상태를 삭제 상태로 변경하는 핸들러 함수 호출', () => {
        renderPost({
          post,
          game,
          members,
          applicants,
          registerError,
        });

        fireEvent.click(screen.getByText('삭제하기'));
        expect(handleClickDeletePost).toBeCalledWith(post.id);
      });
    });
  });
});
