import AggregateError from 'aggregate-error';

const fulfilledFirst: Promise<string> = new Promise((res, rej) => {
  setTimeout(res, 100, "fulfilledFirst");
  // rej(new Error("refusal"));   AggregateError
});

const fulfilledSecond: Promise<string> = new Promise((res, rej) => {
  setTimeout(res, 300, "fulfilledSecond");
  // rej(new Error("refusal"));   AggregateError
});

const fulfilledThird: Promise<string> = new Promise((res, rej) => {
  setTimeout(res, 500, "fulfilledThird");
  // rej(new Error("refusal"));   AggregateError
});

const refusal: Promise<never> = new Promise((res, rej) => {
  rej(new Error("refusal"));
});

function PromiseAny<T>(promises: Promise<T>[]): Promise<T> {
  return new Promise((res, rej) => {
    const result: Error[] = [];
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
            rej(new AggregateError(result));
          }
        });
    });
  });
}

const PromiseAnyBundle = PromiseAny([
  fulfilledFirst,
  fulfilledSecond,
  fulfilledThird,
  refusal,
])
  .then((result) => {
    console.log("result", result);
  })
  .catch((err: AggregateError) => {
    console.log(err.errors);
  });

export default { PromiseAnyBundle };