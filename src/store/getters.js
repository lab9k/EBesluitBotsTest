export default {
  docsOnConfidence({ replies }) {
    return replies
      .sort((a, b) => {
        const first = a.scoreInPercent || a.confidence * 100;
        const second = b.scoreInPercent || b.confidence * 100;
        return second - first;
      })
      .map(d => ({
        ...d,
        avatar:
          d.from === 'nalantis'
            // eslint-disable-next-line global-require
            ? require('../assets/Citybot_Icon.jpg')
            : 'https://picsum.photos/64',
      }));
  },
};
