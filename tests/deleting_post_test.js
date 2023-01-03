Feature('5. 게시글 삭제: '
  + '운동 팀원을 모집하는 사람이 '
  + '운동을 하고 싶지 않게 되었거나 할 수 없게 되었을 경우 글이 사람들에게 노출되지 않게 하기 위해 '
  + '작성한 운동 팀원 모집 게시글을 삭제할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('정상적으로 게시글을 삭제하는 경우', ({ I }) => {
  // Given
  I.setupDeletingPostCase();
  I.login({
    username: 'author12',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');
  I.click('삭제하기');
  I.see('정말로 게시글을 삭제하시겠습니까?');
  I.click('예');

  // Then
  I.see('게시글 삭제가 완료되었습니다');
  I.click('확인');

  I.see('등록된 게시물이 존재하지 않습니다.');
  I.logout();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });
  I.see('등록된 게시물이 존재하지 않습니다.');
  I.logout();
  I.login({
    username: 'user5678',
    password: 'Password!1',
  });
  I.see('등록된 게시물이 존재하지 않습니다.');
});
