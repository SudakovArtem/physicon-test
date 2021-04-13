const initPendulum = () => {
  const spring = document.querySelector('.js-spring');
  const ball = document.querySelector('.js-ball');
  const btn = document.querySelector('.js-start-btn');
  const defaultDuration = 100;
  let springHeight = 200;

  const getNumberFromPrice = (str) => {
    str = +(str.replace(/[^0-9]/g, ''));
    return str;
  };

  let m, k, x0, w0;

  const minLenth = 200;
  const lenth = 500;
  const deviationInput = document.querySelector('input#deviation');
  const weightInput = document.querySelector('input#weight');
  const rigidityInput = document.querySelector('input#rigidity');
  let autoPlayTimeout;

  const animateSpring = () => {
    spring.style.height = null;
    spring.addEventListener('transitionend', () => {
      spring.style.height = `${springHeight}px`;
      autoPlayTimeout = setTimeout(animateSpring.bind(null), w0 * defaultDuration);
    }, {once: true});
  };

  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    const btnText = btn.querySelector('.btn__text');
    if (!btn.classList.contains('active')) {
      m = getNumberFromPrice(document.querySelector('input#weight').value) / 10;
      k = getNumberFromPrice(document.querySelector('input#rigidity').value);
      x0 = getNumberFromPrice(document.querySelector('input#deviation').value);
      w0 = parseFloat(Math.sqrt(k / m).toFixed(1));

      spring.style.transitionDuration = `${defaultDuration * w0}ms`;
      animateSpring();
      btn.classList.add('active');
      btnText.innerText = 'стоп';
    } else {
      clearInterval(autoPlayTimeout);
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        btnText.innerText = 'старт';
      }
    }
  });

  window.rigiditySlider.on('update', (values, handle) => {
    rigidityInput.value = values[handle];
  });

  window.deviationSlider.on('update', (values, handle) => {
    deviationInput.value = values[handle];
    spring.style.height = `${getNumberFromPrice(values[handle]) * (lenth / 20) + minLenth}px`;
    springHeight = getNumberFromPrice(values[handle]) * (lenth / 20) + minLenth;
  });

  window.weightSlider.on('update', (values, handle) => {
    weightInput.value = values[handle];
    ball.style.width = `${getNumberFromPrice(values[handle]) / 10 * 120}px`;
    ball.style.height = `${getNumberFromPrice(values[handle]) / 10 * 120}px`;
  });

};

export {initPendulum};
