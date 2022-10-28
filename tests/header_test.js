Feature('헤더 페이지');

Scenario('홈 화면에서 헤더 페이지 확인', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.seeHeader();
});
