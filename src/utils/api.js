const axios = require("axios");

const fetchTopics = () => {
  return axios
    .get("https://paulncnews.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data;
    });
};

const allArticles = () => {
  return axios
    .get("https://paulncnews.herokuapp.com/api/articles")
    .then(({ data }) => {
      return data;
    });
};

module.exports = { fetchTopics, allArticles };
