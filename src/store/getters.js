export default {
  docsOnConfidence({ replies }) {
    return replies.sort((a, b) => {
      const first = a.scoreInPercent || a.confidence * 100;
      const second = b.scoreInPercent || b.confidence * 100;
      return second - first;
    });
  },
  displaySearchTogether({ displaySearchTogether }) {
    return displaySearchTogether;
  },
};
