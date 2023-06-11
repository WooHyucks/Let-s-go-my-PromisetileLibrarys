const fulfilledFirst = new Promise((res, rej) => {
  setTimeout(res, 100, "fulfilledFirst");
  //rej(new Error("refusal"));   AggregateError
});

const fulfilledSecond = new Promise((res, rej) => {
  setTimeout(res, 300, "fulfilledSecond");
  //rej(new Error("refusal"));   AggregateError
});

const fulfilledThird = new Promise((res, rej) => {
  setTimeout(res, 500, "fulfilledThird");
  //rej(new Error("refusal"));   AggregateError
});

const refusal = new Promise((res, rej) => {
  rej(new Error("refusal"));
});

function PromiseAny(promises) {
  return new Promise((res, rej) => {
    const result = [];
    let count = 0;
    let resState = false;
    promises.forEach((data, index) => {
      data
        .then((value) => {
          if (!resState) {
            resState = true;
            res(value);
          }
        })
        .catch((error) => {
          result[index] = error;
          count++;

          if (count === promises.length && !resState) {
            rej(new AggregateError(result, "All reject return AggregateError"));
          }
        });
    });
  });
}
//promise.any The characteristic is first result return
//but when all results are reject return AggregateError
const PromiseAnyBundle = PromiseAny([
  fulfilledFirst,
  fulfilledSecond,
  fulfilledThird,
  refusal,
])
  .then((result) => {
    console.log("result", result);
  })
  .catch((err) => {
    console.log(err.errors);
  });

export default { PromiseAnyBundle };
