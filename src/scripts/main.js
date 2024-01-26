import { register } from "swiper/element/bundle"

register()

const gallerySwiperEl = document.getElementById('gallerySwiper');

const gallerySwiperParams = {
  centeredSlides: true,
  slidesPerView: 'auto',
  navigation: {
    enabled: true,
    prevEl: '.gallery-prevEl',
    nextEl: '.gallery-nextEl'
  },
  pagination: {
    enabled: true,
    el: '.gallery-pagination',
    clickable: true,
    renderBullet: function (i, cls) {
      return `<span class="dot swiper-pagination-bullet"></span>`
    }
  },
  autoplay: {
    enabled: false, // TODO: Define if autoplay should be enabled
    delay: 4000,
    pauseOnMouseEnter: true,

  },
  speed: 1000,
  grabCursor: true,
  spaceBetween: "-20",
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 10,
    stretch: 0,
    depth: 150,
    modifier: 1,
    slideShadows: false,
    stretch: 50,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 150,
    }
  },
  on: {
    init() {

    }
  }
}

Object.assign(gallerySwiperEl, gallerySwiperParams);

gallerySwiperEl.initialize();

const getButtonProps = (button) => {
  const buttonRect = button.getBoundingClientRect();

  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  const yPos = buttonRect.top + scrollTop;
  const xPos = buttonRect.left;
  const width = button.offsetWidth;

  return {
    yPos,
    xPos,
    width,
  };
};

const positionSpan = ({
  span, mouseEvent, xPos, yPos,
}) => {
  const { clientX, pageY } = mouseEvent;

  const relX = clientX - xPos;
  const relY = pageY - yPos;

  span.style.setProperty('--top', `${relY}px`);
  span.style.setProperty('--left', `${relX}px`);
};

const applyButtonsVariables = () => {
  const buttons = document.querySelectorAll('.button--positionAware');

  buttons.forEach((button) => {
    const { xPos, yPos, width } = getButtonProps(button);

    button.style.setProperty('--button-width', `${width}px`);

    const handleButtonEvent = (evt) => {
      const span = button.querySelector('span');
      if (!span) return;
      positionSpan({
        span, mouseEvent: evt, xPos, yPos,
      });
    };
    button.removeEventListener('mouseenter', handleButtonEvent);
    button.removeEventListener('mouseleave', handleButtonEvent);

    button.addEventListener('mouseenter', handleButtonEvent);
    button.addEventListener('mouseleave', handleButtonEvent);
  });
};

applyButtonsVariables();

window.addEventListener('resize', () => {
  applyButtonsVariables();
});

const copyYearEl = document.getElementById('copyYear');
const currentYear = new Date().getFullYear()

copyYearEl.textContent = currentYear;