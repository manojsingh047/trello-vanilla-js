import { HEADER_ITEMS } from "../store/header-item.store";
import {setupHeader} from './header';
import '../styles/main.scss';

const setupView = () => {
  const appElement = document.getElementById("app");
  appElement.innerHTML = getAppSkeleton();

  setupHeader();


};

const getAppSkeleton = () => {
  return `
  <header></header>
  <section id="body-container"></section>
  <footer></footer>  
  `;
};

export { setupView };
