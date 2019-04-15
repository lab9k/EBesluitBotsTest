import axios from 'axios';

export default new class QuestionService {
  constructor(baseurl) {
    this.baseurl = baseurl;
  }

  async query(question) {
    return axios.post(`${this.baseurl}responses`, { question });
  }
}('https://chatbotsqueries.herokuapp.com/');
