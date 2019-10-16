//this service makes http calls.

const getData = url => fetch(url).then(response => response.json());

const postData = (url, data = {}) =>
  fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data)
  }).then(response => response.json());

export { getData, postData };
