const initPendulum = () => {
  const spring = document.querySelector('.js-spring');
  const ball = document.querySelector('.js-ball');
  const btn = document.querySelector('.js-start-btn');
  const characteristicFrequency = document.querySelector('.characteristic__block--frequency span');
  const characteristicTime = document.querySelector('.characteristic__block--time span');
  const characteristicQuantity = document.querySelector('.characteristic__block--quantity span');
  const characteristicCoordinate = document.querySelector('.characteristic__block--coordinate span');
  const defaultDuration = 100;
  let springHeight = 200;

  const getNumberFromPrice = (str) => {
    str = +(str.replace(/[^0-9]/g, ''));
    return str;
  };

  let m, k, x0, w0, t;

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
      t = parseFloat(((2 * Math.PI) * (Math.sqrt(k / m))).toFixed(1));
      characteristicFrequency.innerText = w0;
      characteristicTime.innerText = t;
      characteristicCoordinate.innerText = '';
      characteristicQuantity.innerText = '∞';

      document.querySelector('.js-slider-deviation').setAttribute('disabled', true);
      document.querySelector('.js-slider-weight').setAttribute('disabled', true);
      document.querySelector('.js-slider-rigidity').setAttribute('disabled', true);

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

      document.querySelector('.js-slider-deviation').removeAttribute('disabled');
      document.querySelector('.js-slider-weight').removeAttribute('disabled');
      document.querySelector('.js-slider-rigidity').removeAttribute('disabled');
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
