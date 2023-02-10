import './index.css';

const playerNmae = document.querySelector('.player-name');
const playerScore = document.querySelector('.player-score');
const formEle = document.getElementById('form-ele');
const refreshScore = document.getElementById('refresh');

const gameId = '2tfc8KffSa4kon6LcmTZ';
const gameUrl = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`;

formEle.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    user: playerNmae.value,
    score: playerScore.value,
  };
  const checkIn = await fetch(gameUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(formData),
  });
  if (!checkIn.ok) {
    return;
  }
  await checkIn.json();
  e.target.reset();
});

refreshScore.addEventListener('click', async () => {
  const res = await fetch(gameUrl);

  const data = await res.json();
  let tableData = '';
  data.result.forEach((values) => {
    tableData += `<li> ${values.user}: ${values.score}</li>`;
  });
  document.getElementById('table-content').innerHTML = tableData;
});
