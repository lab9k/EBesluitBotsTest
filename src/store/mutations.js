import { mutations } from './types';

const extractDocuments = (replies) => {
  const { nalantis, alexandria } = replies;

  const alexandriaDocs = alexandria.results.flatMap((res) => {
    const cat = res.category.description;
    const docs = res.category.documents;
    return docs.map(d => ({
      ...d,
      category: cat,
      from: 'alexandria.works',
      title: d.meta.title,
      sessionid: alexandria.sessionid,
    }));
  });
  const { conceptsOfQuery } = nalantis;
  const nalantisDocs = nalantis.documents.map(d => ({
    ...d,
    conceptsOfQuery,
    from: 'nalantis',
    title: d.originalURI,
  }));

  return [...alexandriaDocs, ...nalantisDocs];
};

export default {
  [mutations.UPDATE_REPLIES](state, replies) {
    const docs = extractDocuments(replies);
    state.replies = docs.map((el, i) => ({ ...el, lId: i }));
  },
  [mutations.REMOVE_REPLIES](state) {
    state.replies = [];
  },
  [mutations.UPDATE_DARK_MODE](state, value) {
    state.darkMode = value;
  },
  [mutations.VOTE](state, { item, positive }) {
    state.replies.find(el => el.lId === item.lId).voted = positive ? 'blue' : 'red';
    state.replies = [...state.replies];
  },
};
