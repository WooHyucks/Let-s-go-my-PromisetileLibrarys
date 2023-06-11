const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();

function sleep(time: number): Promise<void> {
return new Promise((resolve) => {
setTimeout(resolve, time);
});
}

function test(): void {
console.log(year, "year");
sleep(2000)
.then(() => console.log(month, "month"))
.then(() => console.log(date, "date"));
}

const SleepBundle = (test);

// 왜 sleep을 사용하는가?
// 비동기 작업의 시간 조정
// 디버깅 및 테스트에 유용

export default { SleepBundle };






