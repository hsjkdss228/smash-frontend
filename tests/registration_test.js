Feature('3-a. 운동 참가 신청: '
  + '운동 팀을 찾는 사람이 '
  + '내가 하고 싶은 운동에 참가하기 위해 '
  + '특정 운동에 참가를 신청할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('정상적으로 운동 참가를 신청하는 경우', ({ I }) => {
  // Given
  I.setupRegistrableCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');
  I.click('참가 신청하기');

  // Then
  I.see('참가 신청이 완료되었습니다.');
  I.click('확인');
  I.dontSee('참가 신청이 완료되었습니다.');
  I.see('신청 취소하기');
  I.dontSee('참가 신청하기');
  I.logout();
  I.login({
    username: 'author12',
    password: 'Password!1',
  });
  I.amOnPage('/posts/1');
  I.see('사용자 1');
  I.amOnPage('/notices');
  I.see('작성한 모집 게시글에 새로운 신청이 등록되었습니다.');
});
