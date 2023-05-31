const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const {PromiseAny} = require("../src/Promise.Any");

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Promise.Any Test", function () {
  it("promise.any is first result return", function () {
    const fulfilledFirst = new Promise((res, rej) => {
      setTimeout(res, 100, "fulfilledFirst");
    });

    const fulfilledSecond = new Promise((res, rej) => {
      setTimeout(res, 300, "fulfilledSecond");
    });

    const fulfilledThird = new Promise((res, rej) => {
      setTimeout(res, 500, "fulfilledThird");
    });

    const refusal = new Promise((res, rej) => {
      rej(new Error("refusal"));
    });
    return expect(
      PromiseAny([fulfilledFirst, fulfilledSecond, fulfilledThird])
    ).eventually.equal("fulfilledFirst");
  });
});
