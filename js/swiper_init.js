var swiper = new Swiper('.blog-slider', {
    passiveListeners: true,
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 3000
    },
    mousewheel: true,
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    },
    navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}
  });
var comtainer = document.getElementById('swiper_container');
  if (comtainer !== null) {
    comtainer.onmouseenter = function() {
      swiper.autoplay.stop();
    };
    comtainer.onmouseleave = function() {
      swiper.autoplay.start();
      }
  } else {}