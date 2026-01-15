import './style.css'

const generateBtn = document.querySelector('#generate-btn');
const lottoContainer = document.querySelector('#lotto-container');
const themeToggleBtn = document.querySelector('#theme-toggle');
const bgAnimation = document.querySelector('#bg-animation');

// --- Theme Logic ---
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// --- Lotto Logic ---
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

function createBall(number, isPlaceholder = false) {
  const ball = document.createElement('div');
  ball.classList.add('ball');
  if (!isPlaceholder) {
    ball.classList.add(getBallColor(number));
    ball.textContent = number;
  } else {
    ball.style.backgroundColor = '#ccc';
    ball.textContent = '?';
  }
  return ball;
}

async function renderBallsWithAnimation(numbers) {
  lottoContainer.innerHTML = '';
  generateBtn.disabled = true;
  generateBtn.textContent = '추첨 중...';

  // Shuffle effect
  const shuffleInterval = setInterval(() => {
    lottoContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      lottoContainer.appendChild(createBall(randomNum));
    }
  }, 100);

  // Stop shuffle after 1 second and show real numbers one by one
  setTimeout(() => {
    clearInterval(shuffleInterval);
    lottoContainer.innerHTML = '';

    numbers.forEach((num, index) => {
      setTimeout(() => {
        const ball = createBall(num);
        ball.style.animationDelay = '0s'; // Reset delay for immediate pop
        lottoContainer.appendChild(ball);

        if (index === 5) {
          generateBtn.disabled = false;
          generateBtn.textContent = '번호 생성';
        }
      }, index * 300); // 300ms delay between each ball
    });
  }, 1000);
}

generateBtn.addEventListener('click', () => {
  const numbers = generateLottoNumbers();
  renderBallsWithAnimation(numbers);
});

// --- Background Animation ---
function createFloatingBalls() {
  const colors = ['#fbc400', '#69c8f2', '#ff7272', '#aaaaaa', '#b0d840'];
  const ballCount = 15;

  for (let i = 0; i < ballCount; i++) {
    const ball = document.createElement('div');
    ball.classList.add('floating-ball');

    const size = Math.random() * 40 + 20;
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
    ball.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    ball.style.left = `${Math.random() * 100}%`;
    ball.style.animationDuration = `${Math.random() * 10 + 10}s`;
    ball.style.animationDelay = `${Math.random() * 5}s`;

    bgAnimation.appendChild(ball);
  }
}

createFloatingBalls();
