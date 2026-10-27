// Install prompt handler for KeffStation
let deferredPrompt = null;
const installBtn = document.createElement('button');
installBtn.id = 'install-btn';
installBtn.textContent = 'Installer KeffStation';
installBtn.style.cssText = `
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 0.75rem 1.5rem;
  background: #ffd23f;
  color: #070816;
  border: none;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  display: none;
  box-shadow: 0 4px 20px rgba(255, 210, 63, 0.4);
  touch-action: manipulation;
`;
document.body.appendChild(installBtn);

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  installBtn.style.display = 'none';
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    installBtn.style.display = 'none';
  }
  deferredPrompt = null;
});

// Hide if already installed
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
  installBtn.style.display = 'none';
}

// SW update detection
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (navigator.serviceWorker.controller) {
      const updateBanner = document.createElement('div');
      updateBanner.style.cssText = `
        position: fixed;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        padding: 1rem 1.5rem;
        background: #1e6bff;
        color: white;
        border-radius: 999px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(30, 107, 255, 0.4);
        animation: slideDown 0.3s ease;
      `;
      updateBanner.textContent = 'Nouvelle version disponible - Rechargez';
      document.body.appendChild(updateBanner);
      setTimeout(() => updateBanner.remove(), 5000);
    }
  });
}

// Add keyframe for slideDown animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateX(-50%) translateY(-100%); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;
document.head.appendChild(style);