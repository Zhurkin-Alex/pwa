const videos = document.querySelectorAll('.swiper-video');
let currentIndex = 0;

const ANIMATION_DURATION = 200; // Время анимации в миллисекундах (0.2 секунды)
const INTERVAL = 3000;          // Период показа нового видео (3 секунды)

// Установить стартовое видео
videos[currentIndex].style.transform = 'translateY(0)';
videos[currentIndex].style.zIndex = 1;

function showNextVideo() {
  const currentVideo = videos[currentIndex];

  // Анимация выхода вверх
  currentVideo.style.transition = `transform ${ANIMATION_DURATION}ms linear`;
  currentVideo.style.transform = 'translateY(-100%)';
  currentVideo.style.zIndex = 0;

  // Следующее видео
  currentIndex = (currentIndex + 1) % videos.length;
  const nextVideo = videos[currentIndex];

  // Готовим следующее видео к заезду снизу
  nextVideo.style.transition = 'none';
  nextVideo.style.transform = 'translateY(100%)';
  nextVideo.style.zIndex = 1;

  // Запускаем анимацию в следующем кадре
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      nextVideo.style.transition = `transform ${ANIMATION_DURATION}ms linear`;
      nextVideo.style.transform = 'translateY(0)';
    });
  });
}

// Интервал запуска показа следующего видео
setInterval(showNextVideo, INTERVAL);
