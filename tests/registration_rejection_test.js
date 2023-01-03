Feature('3-e. 운동 참가 신청 거절: '
  + '운동 팀원을 모집하는 사람이 '
  + '특정 신청자와는 같이 운동하지 않기 위해 '
  + '해당 신청자의 신청을 거절할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('정상적으로 운동 참가 신청을 거절하는 경우', ({ I }) => {
  // Given
  I.setupRejectingRegistrationCase();
  I.login({
    username: 'author12',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');
  I.click('거절');

  // Then
  I.see('정말로 참가 신청을 거절하시겠습니까?');
  I.click('예');
  I.see('참가 신청 거절이 완료되었습니다.');
  I.click('확인');

  I.dontSeeElement('.applicant');
  I.logout();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });
  I.amOnPage('/posts/1');
  I.dontSee('010-1234-5678');
  I.see('참가 신청하기');
  I.dontSee('참가 취소하기');
});
