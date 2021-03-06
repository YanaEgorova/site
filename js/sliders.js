let swiper = null;
let howSwiper = null;
const mediaLists = {};

const TypeMedia = {
  mob: '(max-width: 1280px)',
};

const keysTypeMedia = Object.keys(TypeMedia);

keysTypeMedia.forEach(media => {
  mediaLists[media] = window.matchMedia(TypeMedia[media]);
});
const handleQueryListener = e => {
  const updateMatches = keysTypeMedia.reduce((acc, media) => {
    acc[media] = mediaLists[media].matches;
    return acc;
  }, {});
  if (updateMatches.mob) {
    howSwiper = new Swiper('.swiper-container.swiper-container-how', {
      slidesPerView: 'auto',
      spaceBetween: 16,
    });
    swiper = new Swiper('.swiper-container.swiper-container-www', {
      slidesPerView: 'auto',
      spaceBetween: 31,
    });
  }
};

keysTypeMedia.forEach(media => {
  mediaLists[media].addEventListener('change', handleQueryListener);
});
handleQueryListener();