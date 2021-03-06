import axios from 'axios';

export default new (class QuestionService {
  constructor(baseurl) {
    this.baseurl = baseurl;
  }

  async query(question) {
    return axios.post(`${this.baseurl}/responses`, { question });
  }

  async vote(positive, item, question, feedbackText) {
    const postData = {
      positive,
      item,
      question,
      feedbackText,
      sessionid: item.sessionid || 'Search-session',
    };
    return axios.post(`${this.baseurl}/vote`, postData);
  }
})(
  process.env.NODE_ENV === 'production'
    ? 'https://chatbotsqueries.herokuapp.com'
    : 'https://chatbotsqueries.herokuapp.com',
);
