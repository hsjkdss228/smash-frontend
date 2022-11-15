Feature('운동 참가 신청');

Scenario('사용자가 참가를 신청하는 경우', async ({ I }) => {
  // Given
  I.setupPosts();
  I.emptyMembers();
  // userId: 1
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    + '.eyJ1c2VySWQiOjF9'
    + '.jNVVoRzUDIDEfED_sh3-5zsNkihSbOtuV-fu4RUH3hw';
  await I.executeScript((setToken) => {
    localStorage.setItem('token', setToken);
  }, token);

  // When
  I.amOnPage('/posts/list');
  I.see('0/24명');
  I.click('[type=button]:nth-child(1)', '신청');

  // Then
  I.see('1/24명');
  I.see('신청취소');
});
