let btn = document.querySelector("#btn");
let text = document.querySelector("#text");
let checklist = [];
const addForm = document.querySelector(".add");
const localData = localStorage.getItem("check");

addForm.addEventListener("submit", addList);

function addList(e) {
  e.preventDefault();
  if (text.value == "") {
    alert("텍스트를 입력해 주세요.");
  } else {
    checklist.push({
      text: text.value,
      checked: false,
    });
    text.value = "";
    text.focus();
  }
  localStorage.setItem("check", JSON.stringify(checklist));
  showList();
}

function showList() {
  const writearea = document.querySelector("#writearea");
  let list = checklist
    .map(
      (task, i) =>
        `<li>
        <img class="checkbox" width="20px" data-index=${i} 
        preserveAspectRatio="none" 
        src=${task.checked ? "square-check-regular.svg" : "square-regular.svg"}>
        ${task.text}
        <span class="del" data-index=${i} id="item${i}">
        <img src="close.png" width="20px">
        </span></li>`
    )
    .join("");
  writearea.innerHTML = `<ul>${list}</ul>`;

  const del = document.querySelectorAll(".del");
  del.forEach((item) => {
    item.addEventListener("click", delX);
  });
}

const changeCheck = (e) => {
  const boxIndex = e.target.dataset.index;
  if (e.target.className === "checkbox") {
    checklist[boxIndex].checked = !checklist[boxIndex].checked;

    localStorage.setItem("check", JSON.stringify(checklist)); //덮어씌우기
  }
  showList();
  //재렌더링
};

function delX() {
  const id = this.getAttribute("data-index");
  checklist.splice(id, 1);
  localStorage.setItem("check", JSON.stringify(checklist)); //갱신
  showList(); //재렌더링
}

function store() {
  if (localData != null) {
    checklist = JSON.parse(localData); //배열에 parse된 값을 넣는다.
    showList();
  }
}

document.querySelector("#writearea").addEventListener("click", changeCheck);

store(); //로컬스토리지를 마지막으로 렌더링함
