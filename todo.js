const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = []; // 빈 어레이 생성

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
} // JS는 local storage에 데이터를 string으로 저장
// JSON.stringify는 JS Object -> string으로
function paintToDo(text) {
  const li = document.createElement("li"); // li를 생성한다
  const delBtn = document.createElement("button"); // 버튼을 생성한다
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  span.innerText = text;
  li.appendChild(delBtn); // 부모안에 인자넣는다 -> li안에 delBtn 넣는다.
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj); // toDos에 toDoObj 삽입
  saveToDos();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // 값 입력되면 다시 작성토록 초기화
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // JSON으로 저장된 데이터를 다시 string으로
    parsedToDos.forEach(function (toDo) {
      // forEach = 각각 함수 실행 / toDo는 실행시킬 각각을 의미
      paintToDo(toDo.text);
    });
  }
}
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
