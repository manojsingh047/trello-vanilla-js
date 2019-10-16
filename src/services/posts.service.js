import * as httpService from "./http.service";
import { ENDPOINTS } from "../constants/endpoint.constant";

const getAllPosts = () => {
  httpService
    .getData(ENDPOINTS.posts)
    .then(posts => console.log("Posts: ", posts));
};

const getPost = id => {
  httpService
    .getData(`${ENDPOINTS.posts}${id}`)
    .then(post => console.log("Post: ", post));
};

export { getAllPosts, getPost };
