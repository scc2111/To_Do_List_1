const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
SHOWING_CN = "showing";

function saveName(text) {   // 이름 저장
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();    // 이벤트 금지
    const currentValue = input.value;
    paintGreetting(currentValue);
    saveName(currentValue);
}  

function askForName() {  // 이름 요청
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit); // submit 했을시 handlesumbmit 수행
}


function paintGreetting(text) {

    form.classList.remove(SHOWING_CN);  // 폼 지움
    greeting.innerText = `Hello ${text}`;
    greeting.classList.add(SHOWING_CN);  // 그리팅 보여줌
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreetting(currentUser);
    }
}

function init() {
    loadName();
}

init();