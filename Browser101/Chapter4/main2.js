const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text == "") {
    input.focus();
    return;
  }
  // 2. 새로운 아이템을 만들다 (텍스트 + 삭제 버튼)
  const item = createItem(text);
  // 3. items 컨테이너 안에 새로 만든 아이템을 추가한다.
  items.appendChild(item);
  // 4. 새로 추가된 아이템으로  스크롤링
  item.scrollIntoView({
    block: "center",
  });
  // 5. 인풋을 초기화 한다.
  input.value = "";
  input.focus();
}

let id = 0; // UUID쓰거나 오브젝트에 있는 해시 코드를 통해 고유한 아이디를 만들어라  let은 왠만하면 쓰지 마라

function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
        <li class="item__row">
            <div class="item">
                <span class="item__name">${text}</span>
                <button class="item__delete">
                    <i class="fas fa-trash-alt" data-id=${id}></i>
                </button>
            </div>
            <div class="item__divider"></div>
        </li>`;
  id++;
  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});

// input에 입력 값 넣고 Enter 눌러서 쇼핑목록에 추가
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onAdd();
  }
});

items.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
