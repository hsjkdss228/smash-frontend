Feature('2-a-ii. 운동 모집 게시글 상세 정보 보기 (작성자 관점): '
  + '운동 팀원을 모집하는 사람이 '
  + '내가 작성한 내용이 잘 올라갔는지 확인하기 위해 '
  + '모집 게시글의 상세 내용을 확인할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('신청자가 있는 경우', ({ I }) => {
  // Given
  I.setupPostAuthorWithApplicants();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');

  // Then
  I.see('수정하기');
  I.see('삭제하기');

  I.see('참가자 정보');
  I.see('010-1234-5678');
  I.see('010-0000-0002');
  I.see('010-0000-0003');

  I.see('신청자 정보');
  I.see('010-0000-0004');
  I.see('010-0000-0005');
  I.see('010-0000-0006');
  I.seeNumberOfElements('.accept-button', 3);
  I.seeNumberOfElements('.reject-button', 3);
});

Scenario('신청자가 없는 경우', ({ I }) => {
  // Given
  I.setupPostAuthorWithoutApplicants();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');

  // Then
  I.see('신청자가 없습니다.');
});
