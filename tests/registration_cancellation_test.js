Feature('3-c. 운동 참가 신청 취소: '
  + '운동에 참가를 신청한 사람이 '
  + '운동에 참가하지 않기 위해 '
  + '자신이 참가를 신청한 운동에서 신청을 취소할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('정상적으로 운동 참가 신청을 취소하는 경우', ({ I }) => {
  // Given
  I.setupCancellationRegistrationCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');
  I.click('신청 취소하기');

  // Then
  I.see('정말로 참가 신청을 취소하시겠습니까?');
  I.click('예');
  I.see('참가 신청 취소가 완료되었습니다.');
  I.click('확인');
  I.see('참가 신청하기');
  I.dontSee('참가 취소하기');
  I.logout();
  I.login({
    username: 'author12',
    password: 'Password!1',
  });
  I.amOnPage('/posts/1');
  I.dontSee('사용자 1');
});
