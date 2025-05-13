function getCookie(name) {
    console.log('document.cookie',document.cookie);
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}
  
document.addEventListener('DOMContentLoaded', () => {
    const params = getCookie('pwa_params');
    if (params) {
      const redirectUrl = `https://google.com${params}`;
      window.location.href = redirectUrl;
    } else {
      window.location.href = 'https://google.com';
    }
});