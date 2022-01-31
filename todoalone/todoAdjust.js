let btn = document.querySelector("#btn");
let text = document.querySelector("#text");
let checklist = [];
const addForm = document.querySelector(".add");

addForm.addEventListener("submit", addList);

function addList(e) {
  e.preventDefault();
  if (text != null) {
    checklist.push(text.value);
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
        `<li>${task}<span class="del" data-index=${i} id="item${i}"><img src="close.png" width="20px"></span></li>`
    )
    .join("");
  writearea.innerHTML = `<ul>${list}</ul>`;

  const del = document.querySelectorAll(".del");
  del.forEach(item => {
    item.addEventListener("click", delX)
  });
  }


function delX() {
  const id = this.getAttribute("data-index");
  checklist.splice(id, 1);
  localStorage.setItem("check", JSON.stringify(checklist)); //갱신
  showList();
}
function store() {
  const result = localStorage.getItem("check");
  if (result != null) {
    checklist = JSON.parse(result); //배열에 parse된 값을 넣는다.
    showList();
  }
}

//배열에 로컬스토리지 값 넣고 showList 함수 내에서 태그붙은 list로 변환해서 좌르륵
store();
