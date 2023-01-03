Feature('7. 회원가입: '
  + '앱을 사용하려는 사람이 '
  + '핵심 기능 사용을 위한 로그인 권한을 새로 생성하기 위해 '
  + '회원 등록 절차를 진행할 수 있다.');

Before(({ I }) => {
  I.clearDatabases();
});

Scenario('회원가입 성공', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.seeHeaderWithoutLogin();
  I.fillSignUpForm();
  I.click('[type="submit"]');

  // Then
  I.see('사용자 님, 반갑습니다.');
});

Scenario('회원가입 실패 (이름을 입력하지 않은 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-name');
  I.click('[type="submit"]');

  // Then
  I.see('성함을 입력해주세요.');
});

Scenario('회원가입 실패 (아이디를 입력하지 않은 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-username');
  I.click('[type="submit"]');

  // Then
  I.see('아이디를 입력해주세요.');
});

Scenario('회원가입 실패 (비밀번호를 입력하지 않은 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-password');
  I.click('[type="submit"]');

  // Then
  I.see('비밀번호를 입력해주세요.');
});

Scenario('회원가입 실패 (비밀번호 확인을 입력하지 않은 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-confirm-password');
  I.click('[type="submit"]');

  // Then
  I.see('비밀번호 확인을 입력해주세요.');
});

Scenario('회원가입 실패 (성별을 선택하지 않은 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillField('성함', '사용자');
  I.fillField('아이디', 'user1234');
  I.fillField('비밀번호', 'Password!1');
  I.fillField('비밀번호 확인', 'Password!1');
  I.fillField('전화번호', '01012345678');
  I.click('[type="submit"]');

  // Then
  I.see('성별을 선택해주세요');
});

Scenario('회원가입 실패 (전화번호를 입력하지 않은 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-phone-number');
  I.click('[type="submit"]');

  // Then
  I.see('전화번호를 입력해주세요.');
});

Scenario('회원가입 실패 (잘못된 형식의 이름을 입력한 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-name');
  I.fillField('성함', '히카르두이젝송두스산투스레이치');
  I.click('[type="submit"]');

  // Then
  I.see('2-10자 사이 한글만 사용 가능합니다.');
});

Scenario('회원가입 실패 (잘못된 형식의 아이디를 입력한 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-username');
  I.fillField('아이디', 'ABCDefgh1234!@#$');
  I.click('[type="submit"]');

  // Then
  I.see('영문 소문자/숫자를 포함해 4~16자만 사용 가능합니다.');
});

Scenario('회원가입 실패 (잘못된 형식의 비밀번호를 입력한 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-password');
  I.fillField('비밀번호', 'pass12');
  I.click('[type="submit"]');

  // Then
  I.see('8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 합니다.');
});

Scenario('회원가입 실패 (잘못된 형식의 전화번호를 입력한 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-phone-number');
  I.fillField('전화번호', '010-9999-9999');
  I.click('[type="submit"]');

  // Then
  I.see('11자리 전화번호 숫자를 입력해야 합니다. (01012345678)');
});

Scenario('회원가입 실패 (이미 존재하는 아이디를 입력한 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-username');
  I.fillField('아이디', 'hsjkdss228');
  I.click('[type="submit"]');

  // Then
  I.see('이미 등록된 아이디입니다.');
});

Scenario('회원가입 실패 (비밀번호와 비밀번호 확인이 일치하지 않는 경우)', ({ I }) => {
  // Given
  I.setupSignUpCase();

  // When
  I.amOnPage('/signup');
  I.fillSignUpForm();
  I.clearInputField('#input-confirm-password');
  I.fillField('비밀번호 확인', '!1Password');
  I.click('[type="submit"]');

  // Then
  I.see('비밀번호 확인이 일치하지 않습니다.');
});
