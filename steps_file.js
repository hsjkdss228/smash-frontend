const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = function () {
  return actor({
    // Setup Databases
    clearPosts() {
      this.amOnPage(`${backdoorBaseUrl}/clear-posts`);
    },
    setupPosts() {
      this.amOnPage(`${backdoorBaseUrl}/setup-posts`);
    },
    clearMembers() {
      this.amOnPage(`${backdoorBaseUrl}/clear-members`);
    },
    setupMembers() {
      this.amOnPage(`${backdoorBaseUrl}/setup-members`);
    },

    // Operations
    login({ userId }) {
      this.amOnPage('/');
      this.fillField('User Id:', userId);
      this.click('로그인');
    },

    // Seeing UI Components
    seeHeader() {
      this.see('SMASH');
    },
  });
};
