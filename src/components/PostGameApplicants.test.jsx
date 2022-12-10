import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import PostGameApplicants from './PostGameApplicants';

describe('PostGameApplicants', () => {
  const acceptRegister = jest.fn();
  const rejectRegister = jest.fn();

  const renderPostGameApplicants = ({
    applicants,
    cannotAcceptRegister,
  }) => {
    render((
      <PostGameApplicants
        applicants={applicants}
        cannotAcceptRegister={cannotAcceptRegister}
        acceptRegister={acceptRegister}
        rejectRegister={rejectRegister}
      />
    ));
  };

  context('게시글에 신청자가 없는 경우', () => {
    const applicants = [];
    const cannotAcceptRegister = false;

    it('신청 버튼 출력', () => {
      renderPostGameApplicants({
        applicants,
        cannotAcceptRegister,
      });

      screen.getByText('신청자가 없습니다.');
    });
  });

  context('게시글에 신청자가 있는 경우', () => {
    const applicants = [
      {
        id: 1,
        name: '전민지',
        gender: '여성',
        phoneNumber: '010-0000-0000',
      },
      {
        id: 2,
        name: '조승준',
        gender: '남성',
        phoneNumber: '010-1212-1212',
      },
      {
        id: 3,
        name: '노성환',
        gender: '남성',
        phoneNumber: '010-9876-5432',
      },
    ];
    const cannotAcceptRegister = false;

    it('각 신청자 정보 및 수락/거절 버튼 출력', () => {
      renderPostGameApplicants({
        applicants,
        cannotAcceptRegister,
      });

      screen.getByText('신청자 정보');
      screen.getByText('전민지');
      expect(screen.getAllByText('남성').length).toBe(2);
      screen.getByText('010-9876-5432');
      expect(screen.getAllByText('수락').length).toBe(3);
      expect(screen.getAllByText('거절').length).toBe(3);
    });
  });

  context('특정 신청자에 대해 수락 버튼을 누르면', () => {
    const applicants = [
      {
        id: 1,
        name: '전민지',
        gender: '여성',
        phoneNumber: '010-0000-0000',
      },
    ];
    const cannotAcceptRegister = false;

    it('참가 신청을 수락하는 핸들러 함수 호출', () => {
      jest.clearAllMocks();
      renderPostGameApplicants({
        applicants,
        cannotAcceptRegister,
      });

      fireEvent.click(screen.getByText('수락'));
      const expectedRegisterId = 1;
      expect(acceptRegister).toBeCalledWith(expectedRegisterId);
    });
  });

  context('특정 신청자에 대해 거절 버튼을 누르면', () => {
    const applicants = [
      {
        id: 2,
        name: '조승준',
        gender: '남성',
        phoneNumber: '010-2222-2222',
      },
    ];
    const cannotAcceptRegister = false;

    it('참가 신청을 거절하는 핸들러 함수 호출', () => {
      jest.clearAllMocks();
      renderPostGameApplicants({
        applicants,
        cannotAcceptRegister,
      });

      fireEvent.click(screen.getByText('거절'));
      const expectedRegisterId = 2;
      expect(rejectRegister).toBeCalledWith(expectedRegisterId);
    });
  });

  context('신청자에 대해 참가신청 수락 버튼을 누를 수 없는 경우', () => {
    const applicants = [
      {
        id: 2,
        name: '노승준',
        gender: '남성',
        phoneNumber: '010-2222-2222',
      },
    ];
    const cannotAcceptRegister = true;

    it('참가 신청 버튼을 눌러도 참가 신청 수락 핸들러 함수가 호출되지 않음', () => {
      jest.clearAllMocks();
      renderPostGameApplicants({
        applicants,
        cannotAcceptRegister,
      });

      fireEvent.click(screen.getByText('수락'));
      expect(acceptRegister).not.toBeCalled();
    });
  });
});
