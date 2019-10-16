import { HEADER_ITEMS } from "../store/header-item.store";

const CLASS_NAMES = {
  header: "header-item"
};

const setupHeader = () => {
  populateHeader();
  attachHeaderEventListener();
};

const attachHeaderEventListener = () => {
  const headerElements = document.getElementsByClassName(CLASS_NAMES.header);
  console.log(headerElements);
};

const populateHeader = () => {
  const header = HEADER_ITEMS.reduce((acc, item) => {
    acc += `<div class="${CLASS_NAMES.header} ${
      item.isDefault ? "active" : ""
    }" id="${item.id}"><span>${item.title}</span></div>`;
    return acc;
  }, "");

  const headerElement = document.getElementsByTagName("header")[0];
  headerElement.innerHTML = header;
};
export { setupHeader };
