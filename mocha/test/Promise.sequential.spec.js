const chai = require("chai");
const { sequential, createSequential } = require("../src/Promise.sequential");

const { assert } = chai;

describe("sequential", function () {
  it("sequential processing", async function () {
    let order = [];
    // order 배열을 통해 순차적으로 실행되는지 확인
    const promises = [
      () => createSequential(1).then(() => order.push(1)),
      () => createSequential(2).then(() => order.push(2)),
      () => createSequential(3).then(() => order.push(3)),
    ];

    await sequential(promises);

    assert.deepEqual(order, [1, 2, 3]);
    // order 배열을 통해 순차적으로 실행되는지 확인
  });
});
