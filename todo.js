const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
    // toDos.id 와 li.id 의 자료형이 틀릴 수 있다. 자료형에 string 과 number 가 있다는 것을 기억하자.
    // parseInt() 는 string을 number 자료형으로 바꿀 수 있다.
  });
  //
  // filter는 array의 모든 아이템을 통해 함수를 실행하고 조건을 만족하는 (=true) 것들을 가지고 다시 array를 만든다.
  // console.log 로  cleanToDos 를 실행했고 그 조건은 toDo.id===1 이었다.
  // 그 때 나온 값은 어떤 것을 선택해도 toDo.id 값이 1인 li의 item이었다.

  toDos = cleanToDos;
  // const toDos로 이미 선언을 했었다. 하지만 이 경우에는 바뀌기 때문에 let으로 선언해줘야한다.
  saveToDos();
}

function loadToDos() {
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if (loadedtoDos !== null) {
    const parsedTodos = JSON.parse(loadedtoDos);
    // JSON은 데이터를 전달할 때, 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 기능
    // json.parse(x) x를 문자열로 만들어준다.
    parsedTodos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
    // forEach() : Array에 있는 것들을 한번 씩 다 실행시켜주는 것  특이한 점은 바로 함수를 만들어 줄 수 있다는 점. 물론
    // 밖으로 빼서 실행시켜줄 수도 있다.
  }
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // localStorage에는 자바스크립트 데이터를 저장할 수 없다.      오직 String만 저장 가능하다. boolean 불가능!
  // JSON.stringify() : 자바스크립트 object를 string 으로 바꿔주는 것
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "X";
  span.innerText = text;
  delBtn.addEventListener("click", deleteToDo);
  li.appendChild(delBtn);
  li.appendChild(span);
  // appendChild() : 뭔가를 그의 father element 안에 넣는 것
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
  // 순서가 중요하다 toDos.push(toDoObj) 가 실행 되는 것으로 toDos Array 에 toDoObj가  저장된다. 그 후에
  // saveToDos() 가 실행되어서 toDos Array에 저장된 toDosObj가 localStorage에 저장된다.
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
