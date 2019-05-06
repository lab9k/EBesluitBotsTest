import axios from 'axios';
import { actions, mutations } from './types';
import questionService from '../services/question.service';

export default {
  async [actions.ASK_QUESTION]({ commit }, question) {
    commit(mutations.REMOVE_REPLIES);
    const d = await questionService.query(question);
    commit(mutations.UPDATE_REPLIES, d.data);
  },
  async [actions.DOWNLOAD_FILE](state, { path, provider, title }) {
    // await download(
    //   `https://chatbotsqueries.herokuapp.com/dl/download-proxy?url=${path}&name=test123.pdf&provider=nalantis`,
    // );
    const base = process.env.NODE_ENV === 'production'
      ? 'https://chatbotsqueries.herokuapp.com'
      : 'http://localhost:3000';
    const data = await axios.get(
      `${base}/dl/download-proxy?url=${path}&name=download.pdf&provider=${provider}`,
      { responseType: 'arraybuffer' },
    );
    console.log(data);
    const url = window.URL.createObjectURL(new Blob([data.data]));
    const link = document.createElement('a');
    link.href = url;
    const disposition = data.headers['content-disposition'];
    const filename = disposition ? disposition.split('=')[1] : title;
    console.log(filename.replace(/"/g, '').trim());

    link.setAttribute('download', filename.replace(/"/g, '').trim()); // or any other extension
    link.style.display = 'none';
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
  },
  async [actions.VOTE]({ commit }, {
    state: positive, item, question, feedbackText,
  }) {
    questionService.vote(positive, item, question, feedbackText);
    commit(mutations.VOTE, { item, positive });
  },
};
