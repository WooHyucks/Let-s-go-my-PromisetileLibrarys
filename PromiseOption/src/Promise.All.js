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

function PromiseAll(promises) {
  return new Promise((res, rej) => {
    const results = [];
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
