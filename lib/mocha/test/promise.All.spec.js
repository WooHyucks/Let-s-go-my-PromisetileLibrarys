const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { PromiseAll } = require("../src/Promise.All");

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Promise.all Test", function () {
  it("When all promises are successful return array!!", function () {
    const fulfilledFirst = new Promise((res, rej) => {
      setTimeout(res, 500, "fulfilledFirst");
    });

    const fulfilledSecond = new Promise((res, rej) => {
      setTimeout(res, 300, "fulfilledSecond");
    });

    const fulfilledThird = new Promise((res, rej) => {
      setTimeout(res, 100, "fulfilledThird");
    });

    const refusal = new Promise((res, rej) => {
      rej(new Error("refusal"));
    });

    return expect(
      PromiseAll([fulfilledFirst, fulfilledSecond, fulfilledThird])
    ).to.eventually.deep.equal([
      "fulfilledFirst",
      "fulfilledSecond",
      "fulfilledThird",
    ]);
  });

  it("Error if any one fails", function () {
    const fulfilledFirst = new Promise((res, rej) => {
      setTimeout(res, 500, "fulfilledFirst");
    });

    const fulfilledSecond = new Promise((res, rej) => {
      setTimeout(res, 300, "fulfilledSecond");
    });

    const fulfilledThird = new Promise((res, rej) => {
      setTimeout(res, 100, "fulfilledThird");
    });

    const refusal = new Promise((res, rej) => {
      rej(new Error("refusal"));
    });

    return expect(
      PromiseAll([fulfilledFirst, fulfilledSecond, fulfilledThird, refusal])
    ).to.be.rejectedWith("refusal");
  });
});
