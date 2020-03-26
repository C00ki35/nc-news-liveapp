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

const postComment = (username, comment, article_id) => {
  return axios
    .post(
      `https://paulncnews.herokuapp.com/api/articles/${article_id}/comments`,
      { username: username, body: comment }
    )
    .then(result => {
      return result;
    });
};

const postArticle = (title, body, topic, author) => {
  const article = { title, body, topic, author };
  return axios
    .post(`https://paulncnews.herokuapp.com/api/articles`, article)
    .then(result => {
      console.log(result);
      return result;
    });
};

const vote = (item_id, vote) => {
  return axios
    .patch(`https://paulncnews.herokuapp.com/api/comments/${item_id}`, {
      inc_votes: vote
    })
    .then(result => {
      return result;
    });
};

const articleVote = (item_id, vote) => {
  return axios
    .patch(`https://paulncnews.herokuapp.com/api/articles/${item_id}`, {
      inc_votes: vote
    })
    .then(result => {
      return result;
    });
};

const addUser = (name, username) => {
  const user = { name: name, username: username };
  return axios
    .post(`https://paulncnews.herokuapp.com/api/users`, user)
    .then(result => {
      return result;
    });
};

const login = username => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/users/${username}`)
    .then(result => {
      return result;
    });
};

const deleteComment = comment_id => {
  return axios
    .delete(`https://paulncnews.herokuapp.com/api/comments/${comment_id}`)
    .then(result => {
      console.log(result);
      return result;
    });
};

const deleteArticle = article_id => {
  return axios
    .delete(`https://paulncnews.herokuapp.com/api/articles/${article_id}`)
    .then(result => {
      return result;
    });
};

module.exports = {
  fetchTopics,
  allArticles,
  articleWithComments,
  postComment,
  vote,
  articleVote,
  addUser,
  login,
  postArticle,
  deleteComment,
  deleteArticle
};
