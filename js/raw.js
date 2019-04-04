(() => {
  // Listen for the enter key press.
  document.body.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      // Simulate clicking on the submit button.
      document.getElementById('submit').click();
    }
  });
  document.getElementById('submit').addEventListener('click', () => {
    const url = 'https://chatbotsqueries.herokuapp.com/responses';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ question: document.getElementById('question').value }),
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((json) => {
        const alexStr = JSON.stringify(json.alexandria, null, 4);
        document.querySelector('.alexandria').innerHTML = alexStr;
        const nalStr = JSON.stringify(json.nalantis, null, 4);
        document.querySelector('.nalantis').innerHTML = nalStr;
      })
      .catch(err => console.log(err));
  });
})();
