const body = document.querySelector("body");

const IMGNUMBER =4;

function handleImageLoad(){
    console.log("finished loading");
}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `photos/${imgNumber + 1}.jpg`
    // random 함수가 0을 줄 수도 있기 때문에 +1 을 해준다.
    image.classList.add("bgImage");
    body.prepend(image);
    // body.prepend(image) : 맨위에 만든느 것이다. append를 하면 맨 밑에 생성이 된다.
}

function genRandom(){
    const number = Math.floor(Math.random() * IMGNUMBER);

    return number
}
// Math 라는 도구
// Math.random : 랜덤한 수를 생성하는 것 
// ex 0~5 random == Math.random()*5
// Math.floor : 버림 정수
// Math.ceil : 올림 정수

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();