const axios = require("axios");

exports.fetchTopics = () => {
  return axios
    .get("https://paulncnews.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data;
    });
};

exports.allArticles = (topic, sort_by) => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/articles`, {
      params: { topic: topic, sort_by: sort_by }
    })
    .then(({ data }) => {
      return data;
    });
};

exports.articleWithComments = article_id => {
  return Promise.all([
    exports.getSingleArticle(article_id),
    exports.articleComments(article_id)
  ]).then(([article, comments]) => {
    return {
      article,
      comments
    };
  });
};

exports.getSingleArticle = article_id => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

exports.articleComments = article_id => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

exports.postComment = (username, comment, article_id) => {
  return axios
    .post(
      `https://paulncnews.herokuapp.com/api/articles/${article_id}/comments`,
      { username: username, body: comment }
    )
    .then(result => {
      return result;
    });
};

exports.postArticle = (title, body, topic, author) => {
  const article = { title, body, topic, author };
  return axios
    .post(`https://paulncnews.herokuapp.com/api/articles`, article)
    .then(result => {
      return result;
    });
};

exports.vote = (item_id, vote, type) => {
  return axios.patch(
    `https://paulncnews.herokuapp.com/api/${type}/${item_id}`,
    {
      inc_votes: vote
    }
  );
};

exports.loginUser = username => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/users/${username}`)
    .then(result => {
      return result;
    });
};

exports.deleteComment = comment_id => {
  return axios
    .delete(`https://paulncnews.herokuapp.com/api/comments/${comment_id}`)
    .then(result => {
      return result;
    });
};

exports.deleteArticle = article_id => {
  return axios
    .delete(`https://paulncnews.herokuapp.com/api/articles/${article_id}`)
    .then(result => {
      return result;
    });
};
exports.addNewUser = (name, username) => {
  const user = { name: name, username: username };
  return axios
    .post(`https://paulncnews.herokuapp.com/api/users`, user)
    .then(result => {
      return result;
    });
};
