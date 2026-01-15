import './style.css'

const generateBtn = document.querySelector('#generate-btn');
const lottoContainer = document.querySelector('#lotto-container');

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

function getBallColor(number) {
  if (number <= 10) return 'yellow';
  if (number <= 20) return 'blue';
  if (number <= 30) return 'red';
  if (number <= 40) return 'gray';
  return 'green';
}

function renderBalls(numbers) {
  lottoContainer.innerHTML = '';
  numbers.forEach((num, index) => {
    const ball = document.createElement('div');
    ball.classList.add('ball', getBallColor(num));
    ball.textContent = num;
    ball.style.animationDelay = `${index * 0.1}s`;
    lottoContainer.appendChild(ball);
  });
}

generateBtn.addEventListener('click', () => {
  const numbers = generateLottoNumbers();
  renderBalls(numbers);
});
