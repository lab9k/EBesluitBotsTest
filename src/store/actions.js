import { actions, mutations } from './types';
import questionService from '../services/question.service';

export default {
  async [actions.ASK_QUESTION]({ commit }, question) {
    const { data } = await questionService.query(question);
    commit(mutations.UPDATE_REPLIES, data);
  },
};
