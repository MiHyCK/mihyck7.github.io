window.addEventListener('DOMContentLoaded', function () {
  var track = document.getElementById('slider-track');
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  var pager = document.getElementById('pager');
  var images = track.querySelectorAll('.gallery-img');

  var visibleCount = 1;
  var currentPage = 0;
  var totalPages = 1;

  function updateVisibleCount() {
    visibleCount = window.innerWidth >= 768 ? 3 : 1;
    totalPages = Math.ceil(images.length / visibleCount);
    if (currentPage > totalPages - 1) {
      currentPage = totalPages - 1;
    }
  }

  function updateSlider() {
    var imageWidth = track.parentElement.clientWidth / visibleCount;
    track.style.transform = 'translateX(-' + (currentPage * visibleCount * imageWidth) + 'px)';
  }

  function buildPager() {
    pager.innerHTML = '';
    for (var i = 0; i < totalPages; i += 1) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-sm ' + (i === currentPage ? 'btn-primary' : 'btn-outline-primary');
      btn.textContent = String(i + 1);
      btn.setAttribute('data-page', String(i));
      pager.appendChild(btn);
    }
  }

  function updatePager() {
    var buttons = pager.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i += 1) {
      if (i === currentPage) {
        buttons[i].classList.remove('btn-outline-primary');
        buttons[i].classList.add('btn-primary');
      } else {
        buttons[i].classList.remove('btn-primary');
        buttons[i].classList.add('btn-outline-primary');
      }
    }
  }

  function goToPage(page) {
    currentPage = page;
    updateSlider();
    updatePager();
  }

  function init() {
    updateVisibleCount();
    buildPager();
    updateSlider();
  }

  prevBtn.addEventListener('click', function () {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  });

  nextBtn.addEventListener('click', function () {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  });

  pager.addEventListener('click', function (event) {
    var target = event.target;
    if (target.tagName === 'BUTTON') {
      goToPage(parseInt(target.getAttribute('data-page'), 10));
    }
  });

  window.addEventListener('resize', function () {
    updateVisibleCount();
    buildPager();
    updateSlider();
  });

  init();
});