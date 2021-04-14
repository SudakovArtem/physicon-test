import MoveTo from '../vendor/move-to';

const initPendulum = () => {
  const breakpointSm = window.matchMedia('(max-width: 767px)');
  const moveTo = new MoveTo();
  const spring = document.querySelector('.js-spring');
  const springWrap = spring.closest('.visualization');
  const ball = document.querySelector('.js-ball');
  const btn = document.querySelector('.js-start-btn');
  const characteristicFrequency = document.querySelector('.characteristic__block--frequency span');
  const characteristicTime = document.querySelector('.characteristic__block--time span');
  const characteristicQuantity = document.querySelector('.characteristic__block--quantity span');
  const characteristicCoordinate = document.querySelector('.characteristic__block--coordinate span');
  const defaultDuration = 100;
  const deviationInput = document.querySelector('input#deviation');
  const weightInput = document.querySelector('input#weight');
  const rigidityInput = document.querySelector('input#rigidity');
  const minCoordinate = 0;
  let autoPlayTimeout;
  let springHeight = 200;
  let m, k, x0, w0, t;
  let oscillationCounter = -1;
  let startDate;
  let clocktimer;

  // функция запуска секундомера
  const startTIME = () => {
    const thisDate = new Date();
    let t = thisDate.getTime() - startDate.getTime();
    let ms = t % 1000;
    t -= ms;
    ms = Math.floor(ms / 10);
    t = Math.floor(t / 1000);
    let s = t % 60;
    t -= s;
    t = Math.floor(t / 60);
    let m = t % 60;
    t -= m;
    t = Math.floor(t / 60);
    let h = t % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;
    characteristicTime.innerText = h + ':' + m + ':' + s + '.' + ms;
    clocktimer = setTimeout(startTIME.bind(null), 10);
  };

  // функция преобразования строки с буквами в число
  const getNumberFromPrice = (str) => {
    str = +(str.replace(/[^0-9]/g, ''));
    return str;
  };

  // установка максимальной и минимальной высот пружины
  let minLength = spring.scrollHeight;
  let length = springWrap.scrollHeight - minLength - 120;

  // функция запуска анимации
  const animateSpring = () => {
    spring.style.height = null;
    characteristicCoordinate.innerText = minCoordinate + ' см';
    spring.addEventListener('transitionend', () => {
      spring.style.height = `${springHeight}px`;
      characteristicCoordinate.innerText = minCoordinate + x0 + ' см';
    }, {once: true});
    autoPlayTimeout = setTimeout(animateSpring.bind(null), w0 * defaultDuration * 2);
    oscillationCounter++;
    characteristicQuantity.innerText = oscillationCounter;
  };

  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    const btnText = btn.querySelector('.btn__text');
    if (!btn.classList.contains('active')) {
      x0 = getNumberFromPrice(document.querySelector('input#deviation').value);
      t = parseFloat(((2 * Math.PI) * (Math.sqrt(k / m))).toFixed(1));

      oscillationCounter = -1;
      characteristicQuantity.innerText = oscillationCounter;

      // отключение возможности изменения параметров
      document.querySelector('.js-slider-deviation').setAttribute('disabled', true);
      document.querySelector('.js-slider-weight').setAttribute('disabled', true);
      document.querySelector('.js-slider-rigidity').setAttribute('disabled', true);

      // запуск анимации
      spring.style.transitionDuration = `${defaultDuration * w0}ms`;
      animateSpring();
      btn.classList.add('active');
      btnText.innerText = 'стоп';
      if (breakpointSm.matches) {
        moveTo.move(document.body);
      }

      // запуск секундомера
      startDate = new Date();
      startTIME();
    } else {

      // остановка анимации
      clearInterval(autoPlayTimeout);
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        btnText.innerText = 'старт';
      }

      // включение возможности изменения параметров
      document.querySelector('.js-slider-deviation').removeAttribute('disabled');
      document.querySelector('.js-slider-weight').removeAttribute('disabled');
      document.querySelector('.js-slider-rigidity').removeAttribute('disabled');

      // остановка секундомера
      clearTimeout(clocktimer);
    }
    btn.blur();
  });

  // обработчик изменения жесткости пружины
  window.rigiditySlider.on('update', (values, handle) => {
    rigidityInput.value = values[handle];
    k = getNumberFromPrice(document.querySelector('input#rigidity').value);
    w0 = parseFloat(Math.sqrt(k / m).toFixed(1));
    characteristicFrequency.innerText = w0;
  });

  // обработчик изменения отклонения от равновесия (вниз)
  window.deviationSlider.on('update', (values, handle) => {
    deviationInput.value = values[handle];
    spring.style.height = `${getNumberFromPrice(values[handle]) * (length / 20) + minLength}px`;
    springHeight = getNumberFromPrice(values[handle]) * (length / 20) + minLength;
  });

  // обработчик изменения массы груза
  window.weightSlider.on('update', (values, handle) => {
    weightInput.value = values[handle];
    m = getNumberFromPrice(document.querySelector('input#weight').value) / 10;
    w0 = parseFloat(Math.sqrt(k / m).toFixed(1));
    characteristicFrequency.innerText = w0;
    ball.style.width = `${getNumberFromPrice(values[handle]) / 10 * 120}px`;
    ball.style.height = `${getNumberFromPrice(values[handle]) / 10 * 120}px`;
  });

  // обновления максимальной и минимальной высот пружины
  window.addEventListener('resize', () => {
    minLength = spring.scrollHeight;
    length = springWrap.scrollHeight - minLength - 120;
  })
};

export {initPendulum};
