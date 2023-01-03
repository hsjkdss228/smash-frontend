Feature('6. 로그인: '
  + '앱을 사용하려는 사람이 '
  + '권한이 필요한 핵심 기능을 사용하기 위해 '
  + '로그인할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('비로그인 시 특정 기능 이용 제한', ({ I }) => {
  // Given
  I.setupLoginRequiredCase();

  // When
  I.amOnPage('/');
  I.click('#navigate-write-button');

  // Then
  I.see('로그인이 필요합니다.');
  I.see('로그인');
  I.see('체험용 계정 선택');
});

Scenario('로그인 성공', ({ I }) => {
  // Given
  I.setupLoginCase();

  // When
  I.amOnPage('/posts/1');
  I.see('게시글 상세 정보라는데 아무 정보가 없다니...');
  I.seeHeaderWithoutLogin();
  I.click('로그인');
  I.fillField('아이디', 'user1234');
  I.fillField('비밀번호', 'Password!1');
  I.click('[type="submit"]');

  // Then
  I.see('사용자 1 님');
  I.seeHeaderWithLogin();
  I.see('게시글 상세 정보라는데 아무 정보가 없다니...');
});

Scenario('로그인 실패 (아이디를 입력하지 않은 경우)', ({ I }) => {
  // Given
  I.setupLoginCase();

  // When
  I.amOnPage('/login');
  I.fillField('비밀번호', 'Password!1');
  I.click('[type="submit"]');

  // Then
  I.see('아이디를 입력해주세요.');
});

Scenario('로그인 실패 (비밀번호를 입력하지 않은 경우)', ({ I }) => {
  // Given
  I.setupLoginCase();

  // When
  I.amOnPage('/login');
  I.fillField('아이디', 'user1234');
  I.click('[type="submit"]');

  // Then
  I.see('비밀번호를 입력해주세요.');
});

Scenario('로그인 실패 (잘못된 아이디를 입력한 경우)', ({ I }) => {
  // Given
  I.setupLoginCase();

  // When
  I.amOnPage('/login');
  I.fillField('아이디', 'abcdefgh12');
  I.fillField('비밀번호', 'Password!1');
  I.click('[type="submit"]');

  // Then
  I.see('존재하지 않는 아이디입니다.');
});

Scenario('로그인 실패 (잘못된 비밀번호를 입력한 경우)', ({ I }) => {
  // Given
  I.setupLoginCase();

  // When
  I.amOnPage('/login');
  I.fillField('아이디', 'user1234');
  I.fillField('비밀번호', 'Godblessyou!1');
  I.click('[type="submit"]');

  // Then
  I.see('비밀번호가 일치하지 않습니다.');
});

Scenario('로그아웃', ({ I }) => {
  // Given
  I.setupLoginCase();
  I.login({
    username: 'user1234',
    password: 'Password!1',
  });

  // When
  I.amOnPage('/posts/1');
  I.logout();

  // Then
  I.seeHeaderWithoutLogin();
});
