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
    state.replies = docs;
  },
};