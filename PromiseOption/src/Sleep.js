const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function test() {
  console.log(year, "year");
  sleep(2000)
    .then(() => console.log(month, "month"))
    .then(() => console.log(date, "date"));
}
const SleepBundle = test();

//Why sleep??
//Adjusting the Asynchronous Operation Time
//Debugging and testing

export default { SleepBundle };
