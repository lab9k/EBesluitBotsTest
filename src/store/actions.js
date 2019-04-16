import axios from 'axios';
import { actions, mutations } from './types';
import questionService from '../services/question.service';

export default {
  async [actions.ASK_QUESTION]({ commit }, question) {
    commit(mutations.REMOVE_REPLIES);
    const { data } = await questionService.query(question);

    commit(mutations.UPDATE_REPLIES, data);
  },
  async [actions.DOWNLOAD_FILE](state, { path, provider }) {
    // await download(
    //   `https://chatbotsqueries.herokuapp.com/dl/download-proxy?url=${path}&name=test123.pdf&provider=nalantis`,
    // );
    const base = process.env.NODE_ENV === 'production'
      ? 'https://chatbotsqueries.herokuapp.com'
      : 'localhost:3000';
    const data = await axios.get(
      `${base}/dl/download-proxy?url=${path}&name=download.pdf&provider=${provider}`,
      { responseType: 'arraybuffer' },
    );
    const url = window.URL.createObjectURL(new Blob([data.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf'); // or any other extension
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    console.log(data);
  },
  async [actions.VOTE](state, {
    state: positive, item, question, feedbackText,
  }) {
    questionService.vote(positive, item, question, feedbackText);
  },
};
