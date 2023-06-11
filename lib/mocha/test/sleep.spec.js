const chai = require("chai");
const {sleep} = require("../src/Sleep");
const { assert } = chai;

const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth();

describe("Test", function () {
  it("Loading after 0.5 second delay", function () {
    return sleep(500).then(() => {
      assert.equal(month, month);
    });
  });
  it("Loading after 1 second delay", function () {
    return sleep(1000).then(() => {
      assert.equal(date, date);
    });
  });
});
