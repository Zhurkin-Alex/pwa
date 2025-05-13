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



// let deferredPrompt;
// let swRegistered = false;

// function registerServiceWorker() {
//   if ('serviceWorker' in navigator && !swRegistered) {
//     navigator.serviceWorker.register('/sw.js')
//       .then(() => {
//         console.log('Service Worker Registered');
//         swRegistered = true;
//       })
//       .catch(err => console.log('Service Worker Registration Failed:', err));
//   }
// }

// function handleFirstInteraction() {
//   registerServiceWorker();

//   const overlay = document.getElementById('installPWA');
//   if (overlay) {
//     overlay.remove();
//   }
// }

// function getRandomSubdomain() {
//   const subdomains = ['premium-stream', 'mystream'];
//   const randomIndex = Math.floor(Math.random() * subdomains.length);
//   return subdomains[randomIndex];
// }

// window.addEventListener('beforeinstallprompt', (event) => {
//   event.preventDefault();
//   deferredPrompt = event;
//   const currentParams = window.location.search;
//   const currentUrl = new URL(window.location.href);
//   const installButton = document.getElementById('installPWA');
//   if (installButton) {
//     installButton.addEventListener('click', async () => {
//       try {
//         deferredPrompt.prompt();
//         const choiceResult = await deferredPrompt.userChoice;

//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the install prompt');
//           document.cookie = `pwa_params=${currentParams}; path=/; max-age=31536000`;
//         } else {
//           console.log('User dismissed the install prompt');
//           const randomSubdomain = getRandomSubdomain();
//           const newHost = `${randomSubdomain}.${currentUrl.host}`;
//           currentUrl.host = newHost;
        
//           // Перенаправляем пользователя
//           window.location.href = currentUrl.toString();
//         }

//         deferredPrompt = null;
//       } catch (err) {
//         console.error('Install prompt failed:', err);
//       }
//     }, { once: true });
//   }
// });

// window.addEventListener('appinstalled', () => {
//   console.log('App installed');

//   // Небольшая задержка перед редиректом, чтобы корректно завершилась установка
//   setTimeout(() => {
//     window.location.href = 'https://yandex.com';
//   }, 500);
// });

// // Устанавливаем обработчик на кнопку, если она уже в DOM
// document.addEventListener('DOMContentLoaded', () => {
//   const installButton = document.getElementById('installPWA');
//   if (installButton) {
//     installButton.addEventListener('click', handleFirstInteraction);
//   }
// });
