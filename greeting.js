const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

// querySelector : css방식으로 다 들고 온다.
// querySelectorAll : 모든 것을 가져온다. 클래스 명에 따른 엘리먼트들을 가져오며 Array를 준다. [] <<이거 무조건 Array라서 귀찮
// getelementbytagname : 태그로 엘리먼트를 가져온다. input, body, html ...

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
    // localStorage 는 urls를 기초로 저장하기 때문에 다른 urls의 localStorage 는 불러오지 않는다.
}

function handleSubmit(event) {
    event.preventDefault();
    // 제출하고 어디론가 가는 것을(기본값) 막고 제출을 입력해도 가만히 있도록 하는것
    const currentValue = input.value;  
    paintGreeting(currentValue);

    saveName(currentValue);
}
// event 가 실행되면서 다른 모든 것들이 반응한다. form제출하는 evevt가 계속 올라가서 document까지 올라간다.
// 그래서 어디론가 그 값이 가버린다.

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit)
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // he is not
        askForName();
    }else{
        // he is
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();