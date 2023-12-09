(function time() {
  const start = performance.now()
  window.addEventListener('load', function loadtime() {
    const end = performance.now()
    const timeSeconds = (end - start) / 1000
    let pageLoadTimeElement = document.getElementById('loadTime');
    pageLoadTimeElement.textContent = 'Загрузка страницы заняла ' + timeSeconds.toFixed(3) + ' секунд';
  })
})()

document.addEventListener('DOMContentLoaded', function () {
  const selector = '.navbar__element';
  const elems = document.querySelectorAll(selector);
  elems.forEach(elem => {
    if (elem.href === document.location.href) {
      elem.classList.add('active');
    }
  })
});
