const fulfilledFirst = new Promise<string>((res, rej) => {
  setTimeout(res, 500, "fulfilledFirst");
});

const fulfilledSecond = new Promise<string>((res, rej) => {
  setTimeout(res, 300, "fulfilledSecond");
});

const fulfilledThird = new Promise<string>((res, rej) => {
  setTimeout(res, 100, "fulfilledThird");
});

const refusal = new Promise<never>((res, rej) => {
  rej(new Error("refusal"));
});

function PromiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise<T[]>((res, rej) => {
    const results: T[] = [];
    let count = 0;
    promises.forEach((data, index) => {
      data
        .then((value) => {
          results[index] = value;
          count++;
          if (count === promises.length) {
            res(results);
          }
        })
        .catch(rej);
    });
  });
}

const PromiseAllBundle = PromiseAll([
  fulfilledFirst,
  fulfilledSecond,
  fulfilledThird,
  refusal,
])
  .then((result) => {
    console.log("result", result);
  })
  .catch((error) => {
    console.log(error.message);
  });

export default { PromiseAllBundle };
