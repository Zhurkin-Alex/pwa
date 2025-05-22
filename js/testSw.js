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
    overlay.remove();
  }
}

function getRandomSubdomain() {
  const subdomains = ['premium-stream', 'mystream'];
  const randomIndex = Math.floor(Math.random() * subdomains.length);
  return subdomains[randomIndex];
}

let beforeInstallPromptFired = false;

window.addEventListener('beforeinstallprompt', (event) => {
  beforeInstallPromptFired = true;
  event.preventDefault();
  deferredPrompt = event;
  const currentParams = window.location.search;
  const currentUrl = new URL(window.location.href);
  const installButton = document.getElementById('installPWA');
  if (installButton) {
    installButton.addEventListener('click', async () => {
      try {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          document.cookie = `pwa_params=${currentParams}; path=/; max-age=31536000`;
        } else {
          console.log('User dismissed the install prompt');
          const randomSubdomain = getRandomSubdomain();
          const newHost = `${randomSubdomain}.${currentUrl.host}`;
          currentUrl.host = newHost;
        
          // Перенаправляем пользователя
          window.location.href = currentUrl.toString();
        }

        deferredPrompt = null;
      } catch (err) {
        console.error('Install prompt failed:', err);
      }
    }, { once: true });
  }
});

window.addEventListener('appinstalled', () => {
  console.log('App installed');

  localStorage.setItem('pwa_installed', 'true')

  // Редирект после установки
  setTimeout(() => {
    window.location.href = 'https://yandex.com';
  }, 500);
});

// Устанавливаем обработчик на кнопку, если она уже в DOM
document.addEventListener('DOMContentLoaded', () => {
  const installButton = document.getElementById('installPWA');
  const pwaDialog = document.getElementById('pwa-dialog');
  setTimeout(() => {
    if (!beforeInstallPromptFired && localStorage.getItem('pwa_installed')) {
      console.log('✅ PWA уже установлена и запущена');
      
      pwaDialog.addEventListener('click', () => {
        window.location.href = 'https://developer.mozilla.org/en-US/docs/Web/HTTP';
      })
    }
  }, 300);

  if (installButton) {
    installButton.addEventListener('click', handleFirstInteraction);
  }
});
