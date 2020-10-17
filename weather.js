const weather = document.querySelector(".js-weather");

const API_KEY = "c121e7213d43ea5af12d77677fdd5c97";
// API는 다른 서버로부터 손 쉽게 데이터를 가져올 수 있는 수단이다.
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    // http:// 는 당연한 것이다.
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
  // fetch에 넣을때는 `` 백틱으로 넣을 것
  //   then() 데이터가 넘어왔을때, 데이터가 완전히 다 넘어왔을때 호출한다.
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
    // 이렇게 선언해도 좋다.
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access to geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  // API 라고 한다.
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
    // loadedCoords에 아무것도 없으면 getWeather 가 실행된다.
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    // 일단 이게 localStorage에 있을 때는 string이니까
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
