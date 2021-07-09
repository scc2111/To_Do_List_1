const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; // 빈 어레이 생성

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
} // JS는 local storage에 데이터를 string으로 저장
// JSON.stringify는 JS Object -> string으로
function paintToDo(text) {
  const li = document.createElement("li"); // li를 생성한다
  const delBtn = document.createElement("button"); // 버튼을 생성한다
  const span = document.createElement("span");
  const newId = toDos.length + 1; // array의 길이 + 1 = id
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo); // btn누를때 deleteToDo 실행
  span.innerText = text;
  li.appendChild(delBtn); // 부모안에 인자넣는다 -> li안에 delBtn 넣는다.
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj); // 빈 어레이 toDos에 toDoObj 삽입
  saveToDos();
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // 값 입력되면 다시 작성토록 초기화
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS); // 키값인 toDos 가져오기
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); // JSON으로 저장된 데이터를 다시 string으로
    parsedToDos.forEach(function (toDo) {
      // forEach = 각각 함수 실행 / toDo는 실행시킬 각각을 의미
      paintToDo(toDo.text);
    });
  }
}
function init() {
  loadToDos(); // 새로고침 해도 이전 저장된 값들이 로드된다
  toDoForm.addEventListener("submit", handleSubmit); // submit 할시 handle 실행
}

init();
