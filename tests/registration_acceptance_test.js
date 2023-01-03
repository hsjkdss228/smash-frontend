Feature('3-d. 운동 참가 신청 수락: '
  + '운동 팀원을 모집하는 사람이 '
  + '특정 신청자와 같이 운동하기 위해 '
  + '해당 신청자의 신청을 수락해 운동에 참가시킬 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('정상적으로 운동 참가 신청을 수락하는 경우', ({ I }) => {
  // Given
  I.setupAcceptingRegistrationCase();
  I.login({
    username: 'author12',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');
  I.click('수락');

  // Then
  I.see('참가 신청 수락이 완료되었습니다.');
  I.click('확인');

  I.dontSeeElement('.applicant');
  I.seeElement('.member');
  I.logout();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });
  I.amOnPage('/posts/1');
  I.see('010-1234-5678');
  I.see('참가 취소하기');
  I.dontSee('신청 취소하기');
});

Scenario('운동 참가 신청 수락이 불가능한 경우', ({ I }) => {
  // Given
  I.setupCannotAcceptableRegistrationCase();
  I.login({
    username: 'author12',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');

  // Then
  I.seeElement('button[disabled]');
});
