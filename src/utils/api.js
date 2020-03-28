import axios from "axios";

export const fetchTopics = () => {
  return axios
    .get("https://paulncnews.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data;
    });
};

export const allArticles = (topic, sort_by) => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/articles`, {
      params: { topic: topic, sort_by: sort_by }
    })
    .then(({ data }) => {
      return data;
    });
};

export const articleWithComments = article_id => {
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

export const getSingleArticle = article_id => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const articleComments = article_id => {
  return axios
    .get(`https://paulncnews.herokuapp.com/api/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const postComment = (username, comment, article_id) => {
  return axios
    .post(
      `https://paulncnews.herokuapp.com/api/articles/${article_id}/comments`,
      { username: username, body: comment }
    )
    .then(result => {
      return result;
    });
};

export const postArticle = (title, body, topic, author) => {
  const article = { title, body, topic, author };
  return axios
    .post(`https://paulncnews.herokuapp.com/api/articles`, article)
    .then(result => {
      return result;
    });
};

export const vote = (item_id, vote, type) => {
  return axios.patch(
    `https://paulncnews.herokuapp.com/api/${type}/${item_id}`,
    {
      inc_votes: vote
    }
  );
};

export const loginUser = (username, password) => {
  const userDetails = { username, password };
  return axios
    .post(`https://paulncnews.herokuapp.com/api/details, ${userDetails}`)
    .then(result => {
      return result;
    })
    .catch(err => {
      console.dir(err);
    });
};

export const deleteComment = comment_id => {
  return axios
    .delete(`https://paulncnews.herokuapp.com/api/comments/${comment_id}`)
    .then(result => {
      return result;
    });
};

export const deleteArticle = article_id => {
  return axios
    .delete(`https://paulncnews.herokuapp.com/api/articles/${article_id}`)
    .then(result => {
      return result;
    });
};
export const addNewUser = (name, username) => {
  const user = { name: name, username: username };
  return axios
    .post(`https://paulncnews.herokuapp.com/api/users`, user)
    .then(result => {
      return result;
    });
};
