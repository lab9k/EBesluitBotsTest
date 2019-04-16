import axios from 'axios';

export default new (class QuestionService {
  constructor(baseurl) {
    this.baseurl = baseurl;
  }

  async query(question) {
    return axios.post(`${this.baseurl}/responses`, { question });
  }

  async vote(positive, item, question, feedbackText) {
    return axios.post(`${this.baseurl}/vote`, {
      positive, item, question, feedbackText,
    });
  }
})(
  process.env.NODE_ENV === 'production'
    ? 'https://chatbotsqueries.herokuapp.com'
    : 'http://localhost:3000',
);
