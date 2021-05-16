const axios = require("axios").default;

exports.post = function (url, data, headers) {
  const defaultHeaders = { ACCEPT: "application/json" };
  return axios.post(url, data, {
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });
};

exports.get = function (url, headers) {
  const defaultHeaders = { ACCEPT: "application/json" };
  return axios.get(url, {
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  });
};

// // sample
// this.post("https://httpbin.org/post")
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error));
