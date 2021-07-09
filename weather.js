const weather = document.querySelector(".js-weather");

const API_KEY = "ef3cc5503de921d3d3660c3ca2aebc60";
// API = Application Programming Interface : 다른 서버로부터 데이터를 가져올수 있는 수단
const COORDS = "coords"; // coords = 좌표

function getWeather(lat, lng) {
  fetch(
    // fetch() = 가져올 데이터가 들어가면 됨 / 따옴표 X   backtick(``)사용
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json(); // 서버로부터 json 받아서 뱉음
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;
    });
  // then의 역할 함수호출(데이터가 완전히 들어온 다음 호출 = fetch가 끝난뒤에 실행해라)
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  // 좌표가져오는데 성공했을떄 처리하는 함수
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    // 객체 생성
    latitude: latitude,
    longitude: longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
  // navigator = 스크립트로 해당 정보를 질의할때와 앱을 특정활동에 등록할떄 사용됨(MDN)
  // navigator.geolocation = 장치의 위치정보에 접근할수있는 Geolocation 객체를 반환(MDN)
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
