//The sequential function receives an array called promptFunctions as input.
//The array must contain fromis generation functions.
async function sequential(promiseFunctions) {
  for (const promiseFn of promiseFunctions) {
    //loop is used to cycle the elements of an array
    await promiseFn();
    //Wait for asynchronous processing with keywords
  }
}

//Promises performing asynchronous operations
function createSequential(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`order: ${value}`);
      resolve();
    }, 100);
  });
}

const promises = [
  () => createSequential(1),
  () => createSequential(2),
  () => createSequential(3),
];

sequential(promises);

module.exports = { sequential, createSequential };
