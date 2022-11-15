Feature('게시글 목록 보기');

// TODO: 각 테스트가 독립적이므로 Before로 구분!!!!

Scenario('등록된 게시글이 없는 경우', ({ I }) => {
  // Given
  I.clearPosts();

  // When
  I.amOnPage('/posts/list');

  // Then
  I.see('등록된 게시물이 존재하지 않습니다.');
});

Scenario('동록된 게시글이 존재하는 경우', async ({ I }) => {
  // Given
  I.setupPosts();

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  + '.eyJ1c2VySWQiOjF9'
  + '.jNVVoRzUDIDEfED_sh3-5zsNkihSbOtuV-fu4RUH3hw';
  await I.executeScript((setToken) => {
    localStorage.setItem('token', setToken);
  }, token);

  // When
  I.amOnPage('/posts/list');
  // I.wait(2);
  I.waitForElement('[posts]', 2);

  // Then
  I.see('축구');
  I.see('2022년 11월 13일 15:00~17:00');
  I.see('잠실종합운동장');
  I.see('3/24명');
  I.see('조회수: 123');

  I.see('배구');
  I.see('2022년 11월 14일 15:00~17:00');
  I.see('장충체육관');
  I.see('2/12명');
  I.see('조회수: 5593');
});
