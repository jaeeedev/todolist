let btn = document.querySelector("#btn");
let text = document.querySelector("#text");
let checklist = [];

btn.addEventListener("click", addList);

function addList() {
  if (text != null) {
    checklist.push(text.value);
    text.value = "";
    text.focus();
  }
  localStorage.setItem("check", JSON.stringify(checklist));
  showList();
}

function showList() {
  let list = "<ul>";
  for (i = 0; i < checklist.length; i++) {
    list =
      list += `<li>${checklist[i]}<span class="del" id="${i}"><img src="close.png" width="20px"></span></li>`;
  }
  list += "</ul>";
  document.querySelector("#writearea").innerHTML = list;
  let del = document.querySelectorAll(".del");
  //<ul></ul>내의 코드들은 이 함수에서 만들어지는 가상의 코드??라서 전역에서 못잡나봄

  for (i = 0; i < checklist.length; i++) {
    del[i].addEventListener("click", delX);
  }
}

function delX() {
  let id = this.getAttribute("id");
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
