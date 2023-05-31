async function sequential(promiseFunctions: (() => Promise<void>)[]) {
  for (const promiseFn of promiseFunctions) {
    await promiseFn();
  }
}

function createSequential(value: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`order: ${value}`);
      resolve();
    }, 100);
  });
}

const promises: (() => Promise<void>)[] = [
  () => createSequential(1),
  () => createSequential(2),
  () => createSequential(3),
];

const SequentialBundle = sequential(promises);

export default { SequentialBundle };
