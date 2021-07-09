const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`; // random 함수가 0 줄수도 있음
  image.classList.add("bgImage"); // img 엘리먼트에 class 명 추가
  body.prepend(image);
}

function genRandom() {
  // 랜덤숫자 리턴 함수
  const number = Math.floor(Math.random() * IMG_NUMBER); // floor는 소수점 밑 버림 , ceil 올림
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
