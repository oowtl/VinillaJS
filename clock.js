const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds }`;
}

// setInterval(함수명, 실행하고 싶은 시간)
// 시간은 3s = 3000 (밀리세컨 기준) 밀리세컨 1s = 1000

// ${seconds < 10 ? `0${seconds}` : seconds }`;
// 삼항???
//  ? => mini if
// if(seconds < 10) {
//     `0${seconds}`
// } else{
//     seconds
// }

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();