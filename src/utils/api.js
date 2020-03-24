const axios = require("axios");

const fetchTopics = () => {
  return axios
    .get("https://paulncnews.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data;
    });
};

const allArticles = (topic, sort_by) => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/articles`, {
      params: { topic: topic, sort_by: sort_by }
    })
    .then(({ data }) => {
      return data;
    });
};

const articleWithComments = article_id => {
  return Promise.all([
    getSingleArticle(article_id),
    articleComments(article_id)
  ]).then(([article, comments]) => {
    return {
      article,
      comments
    };
  });
};

const getSingleArticle = article_id => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

const articleComments = article_id => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

const postComment = (comment, article_id) => {
  return axios
    .post(
      `https://paulncnews.herokuapp.com/api/articles/${article_id}/comments`,
      { username: "jessjelly", body: comment }
    )
    .then(result => {
      return result;
    });
};

module.exports = {
  fetchTopics,
  allArticles,
  articleWithComments,
  postComment
};
