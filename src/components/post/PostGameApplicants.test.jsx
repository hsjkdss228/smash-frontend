import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import context from 'jest-plugin-context';
import ReactModal from 'react-modal';
import PostGameApplicants from './PostGameApplicants';

let game;
jest.mock('../hooks/useGameStore', () => () => ({
  game,
}));
let applicants;
const acceptRegister = jest.fn();
const rejectRegister = jest.fn();
jest.mock('../hooks/useRegisterStore', () => () => ({
  applicants,
  acceptRegister,
  rejectRegister,
}));

describe('PostGameApplicants', () => {
  ReactModal.setAppElement('*');
  const fetchData = jest.fn();

  function renderPostGameApplicants() {
    render((
      <PostGameApplicants
        fetchData={fetchData}
      />
    ));
  }

  context('게시글 상세 정보 중 신청자 목록 컴포넌트에서는', () => {
    context('신청자가 존재하는 경우', () => {
      beforeEach(() => {
        game = {
          currentMemberCount: 2,
          targetMemberCount: 4,
        };
        applicants = [
          {
            registerId: 1,
            userInformation: {
              name: '신청자 1',
              gender: '여성',
              phoneNumber: '010-2222-3333',
              profileImageUrl: 'Image Url 1',
              mannerScore: 5.0,
            },
          },
          {
            registerId: 2,
            userInformation: {
              name: '신청자 2',
              gender: '여성',
              phoneNumber: '010-4444-5555',
              profileImageUrl: 'Image Url 2',
              mannerScore: 5.0,
            },
          },
        ];

        jest.clearAllMocks();
      });

      it('모든 신청자들의 정보와, 각 신청자별로 신청 수락/거절 버튼이 출력됨', () => {
        renderPostGameApplicants();

        screen.getByText('신청자 정보');
        expect(screen.getAllByText('여성').length).toBe(2);
        expect(screen.getAllByText('수락').length).toBe(2);
        expect(screen.getAllByText('거절').length).toBe(2);
      });

      context('특정 신청자에 대해 수락 버튼을 누를 경우', () => {
        it('신청자를 참가자에 추가하는 함수를 호출하고, 게시글 상세 정보 상태 갱신 함수를 호출한 뒤 '
          + ' 참가 신청 수락이 완료되었다는 Modal 출력', async () => {
          renderPostGameApplicants();

          fireEvent.click(screen.getAllByText('수락')[0]);
          await waitFor(() => {
            const expectedRegisterId = 1;
            expect(acceptRegister).toBeCalledWith(expectedRegisterId);
            expect(fetchData).toBeCalled();
            screen.getByText('참가 신청 수락이 완료되었습니다.');
          });
        });
      });

      context('특정 신청자에 대해 거절 버튼을 누를 경우', () => {
        it('참가 신청을 거절할 것인지 확인하는 Modal 출력, Modal에서 예 버튼을 누르면 '
          + '신청자를 신청자 목록에서 제거하는 함수를 호출하고, 게시글 상세 정보 상태 갱신 함수를 호출한 뒤 '
          + '참가 신청 거절이 완료되었다는 Modal 출력', async () => {
          renderPostGameApplicants();

          fireEvent.click(screen.getAllByText('거절')[1]);
          screen.getByText('정말로 참가 신청을 거절하시겠습니까?');
          fireEvent.click(screen.getByText('예'));
          await waitFor(() => {
            const expectedRegisterId = 2;
            expect(rejectRegister).toBeCalledWith(expectedRegisterId);
            expect(fetchData).toBeCalled();
            screen.getByText('참가 신청 거절이 완료되었습니다.');
          });
        });
      });

      context('참가자가 모집 목표 인원 수만큼 존재할 경우', () => {
        beforeEach(() => {
          game = {
            currentMemberCount: 2,
            targetMemberCount: 2,
          };

          jest.clearAllMocks();
        });

        it('신청자에 대해 수락 버튼을 누를 수 없음', () => {
          renderPostGameApplicants();

          fireEvent.click(screen.getAllByText('수락')[0]);
          let expectedRegisterId = 1;
          expect(acceptRegister).not.toBeCalledWith(expectedRegisterId);
          expectedRegisterId = 2;
          fireEvent.click(screen.getAllByText('수락')[1]);
          expect(acceptRegister).not.toBeCalledWith(expectedRegisterId);
        });
      });
    });

    context('신청자가 존재하지 않는 경우', () => {
      beforeEach(() => {
        game = {
          currentMemberCount: 0,
          targetMemberCount: 4,
        };
        applicants = [];
      });

      it('신청자가 존재하지 않는다는 메시지를 출력', () => {
        renderPostGameApplicants();

        screen.getByText('신청자가 없습니다.');
      });
    });
  });
});
