const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = function () {
  return actor({
    // Setup Databases
    clearDatabases() {
      this.amOnPage(`${backdoorBaseUrl}/clear-databases`);
    },

    setupPostsAuthor() {
      this.amOnPage(`${backdoorBaseUrl}/setup-posts-author`);
    },
    setupPostsNotApplicant() {
      this.amOnPage(`${backdoorBaseUrl}/setup-posts-not-applicant`);
    },
    setupPostsApplicant() {
      this.amOnPage(`${backdoorBaseUrl}/setup-posts-applicant`);
    },
    setupPostsMember() {
      this.amOnPage(`${backdoorBaseUrl}/setup-posts-member`);
    },

    setupPostNotLoggedInAndNotFull() {
      this.amOnPage(`${backdoorBaseUrl}/setup-post-not-logged-in-and-not-full`);
    },
    setupPostNotLoggedInAndFull() {
      this.amOnPage(`${backdoorBaseUrl}/setup-post-not-logged-in-and-full`);
    },
    setupPostNotApplicantAndNotFull() {
      this.amOnPage(`${backdoorBaseUrl}/setup-post-not-applicant-and-not-full`);
    },
    setupPostNotApplicantAndFull() {
      this.amOnPage(`${backdoorBaseUrl}/setup-post-not-applicant-and-full`);
    },
    setupPostApplicant() {
      this.amOnPage(`${backdoorBaseUrl}/setup-post-applicant`);
    },
    setupPostMember() {
      this.amOnPage(`${backdoorBaseUrl}/setup-post-member`);
    },

    setupPostAuthorWithApplicants() {
      this.amOnPage(`${backdoorBaseUrl}/setup-post-author-with-applicants`);
    },
    setupPostAuthorWithoutApplicants() {
      this.amOnPage(`${backdoorBaseUrl}/setup-post-author-without-applicants`);
    },

    setupRegistrableCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-registrable-case`);
    },
    setupCancellationParticipationCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-cancellation-participation-case`);
    },
    setupCancellationRegistrationCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-cancellation-registration-case`);
    },
    setupAcceptingRegistrationCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-accepting-registration-case`);
    },
    setupCannotAcceptableRegistrationCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-cannot-acceptable-registration-case`);
    },
    setupRejectingRegistrationCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-rejecting-registration-case`);
    },

    setupWritingPostCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-writing-post-case`);
    },
    setupDeletingPostCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-deleting-post-case`);
    },

    setupLoginRequiredCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-login-required-case`);
    },
    setupLoginCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-login-case`);
    },
    setupSignUpCase() {
      this.amOnPage(`${backdoorBaseUrl}/setup-sign-up-case`);
    },

    setupNotices() {
      this.amOnPage(`${backdoorBaseUrl}/setup-notices`);
    },

    // Actions
    login({ username, password }) {
      this.amOnPage('/login');
      this.fillField('아이디', username);
      this.fillField('비밀번호', password);
      this.click('[type="submit"]');
    },
    logout() {
      this.click('로그아웃');
    },
    fillPostForm() {
      // TODO: 날짜가 바뀌어도 통과할 수 있는 방식으로 테스트 수정 필요
      //    Date 객체를 이용할 수 있을 것 같다.
      this.fillField('종목', '축구');
      this.click('.react-datepicker__day--028');
      this.click('.input-game-start-time-am');
      this.fillField('start hour', '10');
      this.fillField('start minute', '00');
      this.click('.input-game-end-time-pm');
      this.fillField('end hour', '12');
      this.fillField('end minute', '30');
      this.fillField('장소', '김천종합운동장');
      this.fillField('모집 인원', '15');
      this.fillField('상세 내용', '상주 상무 선수단과 친선경기에 참여하실 분들을 모집합니다.');
    },
    fillSignUpForm() {
      this.fillField('성함', '사용자');
      this.fillField('아이디', 'user1234');
      this.fillField('비밀번호', 'Password!1');
      this.fillField('비밀번호 확인', 'Password!1');
      this.click('#input-gender-male');
      this.fillField('전화번호', '01012345678');
    },
    clearInputField(locator) {
      this.doubleClick(locator);
      this.pressKey(['Shift', 'Home']);
      this.pressKey('Backspace');
    },
    seeAllOfCheckboxIsChecked({ checkboxesCount }) {
      Array(checkboxesCount).fill(0)
        .map((_, index) => index + 1)
        .forEach((_, index) => {
          this.seeCheckboxIsChecked(`[id="${index + 1}"]`);
        });
    },
    seeAllOfCheckboxIsUnchecked({ checkboxesCount }) {
      Array(checkboxesCount).fill(0)
        .map((_, index) => index + 1)
        .forEach((_, index) => {
          this.dontSeeCheckboxIsChecked(`[id="${index + 1}"]`);
        });
    },

    // See Pages or Components
    seeLoginPage() {
      this.see('우리들의 스포츠 매칭 시스템');
      this.see('LOGIN');
      this.see('회원가입');
    },
    seeHeaderWithoutLogin() {
      this.see('체험용 계정 선택');
      this.see('로그인');
      this.dontSee('알림');
      this.dontSee('마이페이지');
      this.dontSee('로그아웃');
    },
    seeHeaderWithLogin() {
      this.see('알림');
      this.see('마이페이지');
      this.see('로그아웃');
      this.dontSee('체험용 계정 선택');
      this.dontSee('로그인');
    },
  });
};
