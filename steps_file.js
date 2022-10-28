// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({
    seeHeader() {
      this.see('SMASH');
      this.see('운동 선택하기');
      this.see('사이드바');
    },
  });
};
