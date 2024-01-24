import { register } from "swiper/element/bundle"

register()

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