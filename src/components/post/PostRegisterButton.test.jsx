import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import ReactModal from 'react-modal';
import PostRegisterButton from './PostRegisterButton';

let game;
jest.mock('../hooks/useGameStore', () => () => ({
  game,
}));
let registerServerError;
let changeRegisterServerError;
const registerGame = jest.fn(() => game.id);
const cancelRegisterGame = jest.fn();
const cancelParticipateGame = jest.fn();
jest.mock('../hooks/useRegisterStore', () => () => ({
  registerGame,
  cancelRegisterGame,
  cancelParticipateGame,
  registerServerError,
  changeRegisterServerError,
}));

describe('PostRegisterButton', () => {
  ReactModal.setAppElement('*');
  const fetchData = jest.fn();

  function renderPostRegisterButton() {
    render((
      <PostRegisterButton
        fetchData={fetchData}
      />
    ));
  }

  context('사용자가 게시글의 게임에 참가 신청을 하지 않았거나, 취소했거나, 거절당했었을 경우', () => {
    beforeEach(() => {
      game = {
        id: 1,
        registerStatus: 'none',
        registerId: null,
      };
      registerServerError = '';
    });

    it('신청 버튼을 출력', () => {
      renderPostRegisterButton();

      screen.getByText('참가 신청하기');
    });

    context('서버로부터 전달된 에러 메시지가 존재하는 경우', () => {
      beforeEach(() => {
        registerServerError = 'Already Joined Game';
      });

      it('신청 버튼 옆에 에러 메시지를 같이 출력', () => {
        renderPostRegisterButton();

        screen.getByText('참가 신청하기');
        screen.getByText('Already Joined Game');
      });
    });

    context('신청 버튼을 클릭하면', () => {
      it('운동 참가 신청 함수 호출, 신청한 게임 id가 반환되면 '
        + '게시글 상세 정보 상태 갱신 함수를 호출한 뒤 참가 신청이 완료되었다는 Modal 출력 ', async () => {
        renderPostRegisterButton();

        fireEvent.click(screen.getByText('참가 신청하기'));
        await waitFor(() => {
          expect(registerGame).toBeCalledWith(game.id);
          expect(fetchData).toBeCalled();
          screen.getByText('참가 신청이 완료되었습니다.');
        });
      });
    });
  });

  context('사용자가 게시글의 게임에 참가 신청을 한 상태인 경우', () => {
    beforeEach(() => {
      game = {
        id: 1,
        registerStatus: 'processing',
        registerId: 5,
      };
    });

    it('신청 취소 버튼을 출력', () => {
      renderPostRegisterButton();

      screen.getByText('신청 취소하기');
    });

    context('서버로부터 전달된 에러 메시지가 존재하는 경우', () => {
      beforeEach(() => {
        changeRegisterServerError = '신청 상태가 접속한 사용자의 신청 상태가 아닙니다.';
      });

      it('신청 취소 버튼 옆에 에러 메시지를 같이 출력', () => {
        renderPostRegisterButton();

        screen.getByText('신청 취소하기');
        screen.getByText('신청 상태가 접속한 사용자의 신청 상태가 아닙니다.');
      });
    });

    context('신청 취소 버튼을 클릭하면', () => {
      it('운동 참가 신청 취소를 확인하는 Modal 출력, Modal에서 예 버튼을 누르면 '
        + '참가 신청을 취소하는 함수를 호출하고, 게시글 상세 정보 상태 갱신 함수를 호출한 뒤 '
        + '참가 신청 취소가 완료되었다는 Modal 출력', async () => {
        renderPostRegisterButton();

        fireEvent.click(screen.getByText('신청 취소하기'));
        screen.getByText('정말로 참가 신청을 취소하시겠습니까?');
        fireEvent.click(screen.getByText('예'));
        await waitFor(() => {
          expect(cancelRegisterGame).toBeCalledWith(game.registerId);
          expect(fetchData).toBeCalled();
          screen.getByText('참가 신청 취소가 완료되었습니다.');
        });
      });
    });
  });

  context('사용자가 게시글의 게임에 참가하는 상태인 경우', () => {
    beforeEach(() => {
      game = {
        id: 1,
        registerStatus: 'accepted',
        registerId: 3,
      };
    });

    it('참가 취소 버튼을 출력', () => {
      renderPostRegisterButton();

      screen.getByText('참가 취소하기');
    });

    context('서버로부터 전달된 에러 메시지가 존재하는 경우', () => {
      beforeEach(() => {
        changeRegisterServerError = '등록된 신청 상태를 찾을 수 없습니다.';
      });

      it('참가 취소 버튼 옆에 에러 메시지를 같이 출력', () => {
        renderPostRegisterButton();

        screen.getByText('참가 취소하기');
        screen.getByText('등록된 신청 상태를 찾을 수 없습니다.');
      });
    });

    context('신청 버튼을 클릭하면', () => {
      it('운동 참가 취소를 확인하는 Modal 출력, Modal에서 예 버튼을 누르면 '
        + '참가를 취소하는 함수를 호출하고, 게시글 상세 정보 상태 갱신 함수를 호출한 뒤 '
        + '참가 취소가 완료되었다는 Modal 출력', async () => {
        renderPostRegisterButton();

        fireEvent.click(screen.getByText('참가 취소하기'));
        screen.getByText('정말로 참가를 취소하시겠습니까?');
        fireEvent.click(screen.getByText('예'));
        await waitFor(() => {
          expect(cancelParticipateGame).toBeCalledWith(game.registerId);
          expect(fetchData).toBeCalled();
          screen.getByText('참가 취소가 완료되었습니다.');
        });
      });
    });
  });
});
