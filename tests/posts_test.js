Feature('1. 게시글 목록 보기: '
  + '운동 팀을 찾는 사람이 '
  + '언제, 어디서, 몇 명이 어떤 운동을 하는지 목록을 보고 미리 알기 위해 '
  + '참가자 모집 게시글을 확인할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('등록된 게시글이 존재하는 경우 (작성자 관점)', ({ I }) => {
  // Given
  I.setupPostsAuthor();
  I.login({
    username: 'author12',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/list');

  // Then
  I.see('축구');
  I.see('2022년 11월 13일 오후 03:00 ~ 오후 06:00');
  I.see('상암월드컵경기장');
  I.see('1/30명 참가');
  I.see('100 조회');

  I.see('야구');
  I.see('2022년 11월 14일 오후 12:00 ~ 오후 05:00');
  I.see('잠실야구장');
  I.see('1/30명 참가');
  I.see('200 조회');

  I.see('내가 쓴 글');
  I.dontSee('참가 신청 중');
  I.dontSee('참가 예정');

  I.click('내가 쓴 글');
  I.see('작성자');
});

Scenario('등록된 게시글이 존재하는 경우 (미신청자 관점)', ({ I }) => {
  // Given
  I.setupPostsNotApplicant();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/list');

  // Then
  I.dontSee('내가 쓴 글');
  I.dontSee('참가 신청 중');
  I.dontSee('참가 예정');
});

Scenario('등록된 게시글이 존재하는 경우 (신청자 관점)', ({ I }) => {
  // Given
  I.setupPostsApplicant();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/list');

  // Then
  I.dontSee('내가 쓴 글');
  I.see('참가 신청 중');
  I.dontSee('참가 예정');
});

Scenario('등록된 게시글이 존재하는 경우 (참가자 관점)', ({ I }) => {
  // Given
  I.setupPostsMember();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/list');

  // Then
  I.dontSee('내가 쓴 글');
  I.dontSee('참가 신청 중');
  I.see('참가 예정');
});

Scenario('등록된 게시글이 없는 경우', ({ I }) => {
  // When
  I.amOnPage('/posts/list');

  // Then
  I.see('등록된 게시물이 존재하지 않습니다.');
});
