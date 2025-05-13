// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../sw.js')
//       .then(() => console.log('Service Worker Registered-1'))
//       .catch(err => console.log('Service Worker Registration Failed:', err));
// }

let deferredPrompt;
let swRegistered = false;

function registerServiceWorker() {
  if ('serviceWorker' in navigator && !swRegistered) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        console.log('Service Worker Registered');
        swRegistered = true;
      })
      .catch(err => console.log('Service Worker Registration Failed:', err));
  }
}

function handleFirstInteraction() {
  registerServiceWorker();

  const overlay = document.getElementById('installPWA');
  if (overlay) {
    overlay.remove(); // Убираем кнопку после первого клика
  }
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;

  const installButton = document.getElementById('installPWA');
  // installButton.style.display = 'block';

  if (installButton) {
    installButton.addEventListener('click', () => {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('user added app');
          // window.location.href = 'https://www.google.com/';
        } else {
          console.log('redirect to subdomain');
        }
        deferredPrompt = null;
      });
    });
  }
});

window.addEventListener('appinstalled', () => {
  console.log('app installed');
  document.getElementById('installPWA').style.display = 'none';
    // Редирект после установки
  window.location.href = 'https://yandex.com';

});

// Навешиваем обработчик на невидимую кнопку
document.getElementById('installPWA').addEventListener('click', handleFirstInteraction);
