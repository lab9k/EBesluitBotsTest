(() => {
  const titles = document.querySelectorAll('.toggle');
  titles.forEach((title, i) => {
    title.addEventListener('click', () => {
      const otherElement = titles[titles.length - 1 - i].parentElement;
      if (otherElement.style.visibility === 'hidden') {
        otherElement.style.visibility = 'visible';
        otherElement.style.display = 'flex';
      } else if (
        otherElement.style.visibility === 'visible'
        || otherElement.style.visibility === ''
      ) {
        otherElement.style.visibility = 'hidden';
        otherElement.style.display = 'none';
      }
    });
  });
})();
