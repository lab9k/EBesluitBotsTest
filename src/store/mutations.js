import { mutations } from './types';

const extractDocuments = (replies) => {
  const { nalantis, alexandria } = replies;
  let alexandriaDocs = [];
  if (alexandria.results) {
    alexandriaDocs = alexandria.results.flatMap((res) => {
      const cat = res.category.description;
      const docs = res.category.documents;
      return docs.map(d => ({
        ...d,
        category: cat,
        from: 'alexandria.works',
        title: d.filename,
        sessionid: alexandria.sessionid,
        highlight: d.meta.description,
      }));
    });
  }

  const { conceptsOfQuery } = nalantis;
  const nalantisDocs = nalantis.documents.map((d) => {
    let highlight = '';
    if (d.paragraphs && d.paragraphs.length > 0) {
      highlight = d.paragraphs[0].content;
    } else {
      highlight = d.summary;
    }
    return {
      ...d,
      conceptsOfQuery,
      category: conceptsOfQuery.join(', '),
      from: 'nalantis',
      title: d.originalURI,
      content: d.summary,
      highlight,
    };
  });

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
  [mutations.UPDATE_DISPLAY_TOGETHER](state, value) {
    state.displaySearchTogether = value;
  },
};
