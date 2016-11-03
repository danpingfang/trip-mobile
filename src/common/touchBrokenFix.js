function needTouchBrokenFix() {
  let isTouchMove = false;
  document.addEventListener('touchmove', () => {
    isTouchMove = true;
  }, true);

  document.addEventListener('touchend', (event) => {
    if (isTouchMove) {
      event.preventDefault();
      event.stopPropagation();
    }
    isTouchMove = false;
  }, true);
}

export default needTouchBrokenFix;
